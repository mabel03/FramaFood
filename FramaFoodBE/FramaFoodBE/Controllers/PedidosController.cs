using FramaFoodBE.Models;
using FramaFoodBE.Models.ViewModels;
using FramaFoodBE.Services;
using FramaFoodBE.ServicesInterfaz;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FramaFoodBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosController : ControllerBase
    {
        private readonly ServiceGeneral _generalService;

        public PedidosController(ServiceGeneral generalService)
        {
            _generalService = generalService;
        }

        private async Task<IEnumerable<PedidoDto>> GetPedidosWithDetails(string estadoFiltro)
        {
            var pedidosBase = await _generalService.ObtenerDatosConFiltroEIncluidos<Pedido>(
                p => estadoFiltro == "ALL" || p.Estado == estadoFiltro ||
                     (estadoFiltro == "PENDING_PREP" && (p.Estado == "PEND" || p.Estado == "PREP")),
                p => p.Mesa,
                p => p.Mesera
            );

            var pedidoIds = pedidosBase.Select(p => p.IdPedido).ToList();


            var detalles = await _generalService.ObtenerDatosConFiltroEIncluidos<Detallepedido>(
                dp => pedidoIds.Contains(dp.IdPedido),
                dp => dp.Plato,
                dp => dp.Usuario 
            );

            var detallesGroupedByPedidoId = detalles.GroupBy(dp => dp.IdPedido)
                                                    .ToDictionary(g => g.Key, g => g.ToList());

            var pedidoDtos = pedidosBase.Select(p =>
            {
                var currentDetalles = detallesGroupedByPedidoId.TryGetValue(p.IdPedido, out var list)
                                      ? list
                                      : new List<Detallepedido>();

                return new PedidoDto
                {
                    IdPedido = p.IdPedido,
                    IdMesa = p.IdMesa,
                    NumeroMesa = p.Mesa?.Numero,
                    IdMesera = p.IdMesera,
                    NombreMesera = p.Mesera?.Nombre,
                    FechaHora = p.FechaHora,
                    Estado = p.Estado,
                    DetallePlatos = currentDetalles.Select(dp => new DetallePedidoDto
                    {
                        IdDetalle = dp.IdDetalle,
                        IdPlato = dp.IdPlato,
                        NombrePlato = dp.Plato?.Nombre,
                        Cantidad = dp.Cantidad,
                        EstadoDetalle = dp.Estado,
                        Comentario = dp.Comentario,
                        IdChef = dp.IdChef
                    }).ToList(),
                    CantidadPlatos = currentDetalles.Sum(dp => dp.Cantidad)
                };
            }).ToList();

            return pedidoDtos;
        }

        [HttpGet("ObtenerPedidosPendientes")]
        public async Task<ActionResult<IEnumerable<PedidoDto>>> ObtenerPedidosPendientes()
        {
            var pedidoDtos = await GetPedidosWithDetails("PENDING_PREP");
            return Ok(pedidoDtos);
        }

        [HttpGet("ObtenerPedidosListos")]
        public async Task<ActionResult<IEnumerable<PedidoDto>>> ObtenerPedidosListos()
        {
            var pedidoDtos = await GetPedidosWithDetails("LIST");
            return Ok(pedidoDtos);
        }

        [HttpPut("ActualizarEstadoPedido/{id}")]
        public async Task<IActionResult> ActualizarEstadoPedido(int id, [FromBody] PedidoUpdateStatusDto model)
        {
            var pedidoResult = await _generalService.ObtenerDatosConFiltroClase<Pedido>(p => p.IdPedido == id);

            if (pedidoResult == null)
            {
                return NotFound();
            }

            pedidoResult.Estado = model.Estado;

            var updatePedidoResult = await _generalService.Editar(pedidoResult);
            if (updatePedidoResult is BadRequestObjectResult)
            {
                return updatePedidoResult;
            }

            if (model.Estado == "ENVI")
            {

                var mesaResult = await _generalService.ObtenerDatosConFiltroClase<Mesa>(m => m.IdMesa == pedidoResult.IdMesa);
                if (mesaResult != null)
                {
                    mesaResult.Estado = "DIS";
                    var updateMesaResult = await _generalService.Editar(mesaResult);
                    if (updateMesaResult is BadRequestObjectResult)
                    {
                        return updateMesaResult;
                    }
                }
            }

            return NoContent();
        }
    }

}
