using FramaFoodBE.Models;
using FramaFoodBE.Services;
using FramaFoodBE.ServicesInterfaz;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FramaFoodBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlatosController : ControllerBase
    {
        private readonly ServiceGeneral _serviceGeneral;

        public PlatosController(ServiceGeneral serviceGeneral) 
        {
            _serviceGeneral = serviceGeneral;
        }

        [HttpGet("GetAllPlatos")]
        public async Task<ActionResult<IEnumerable<Plato>>> GetAllPlatos()
        {
            var platos = await _serviceGeneral.ObtenerDatos<Plato>();
            return Ok(platos);
        }

        [HttpGet("GetRecetaByPlatoId/{idPlato}")]
        public async Task<ActionResult<Receta>> GetRecetaByPlatoId(int idPlato)
        {
            var recetas = await _serviceGeneral.ObtenerDatosConFiltro<Receta>(r => r.IdPlato == idPlato);
            var receta = recetas.FirstOrDefault(); 

            if (receta == null)
            {
                return NotFound("Receta no encontrada.");
            }
            return Ok(receta);
        }

        [HttpPost("CreateOrder")]
        public async Task<ActionResult> CreateOrder([FromBody] CreatePedidoDto orderDto)
        {
            if (orderDto == null)
            {
                return BadRequest("El pedido no puede estar vacío o sin detalles de platos.");
            }

            var pedido = new Pedido
            {
                IdMesa = orderDto.IDMESA,
                IdMesera = orderDto.IDMESERA,
                FechaHora = DateTime.Now,
                Comentario = orderDto.comentario ?? "",
                Cantidad = orderDto.cantidad,
                Estado = "PEND"
            };

            await _serviceGeneral.Creacion(pedido);

            foreach (var detalleDto in orderDto.Detalles)
            {
                var detallePedido = new Detallepedido
                {
                    IdPedido = pedido.IdPedido,
                    IdPlato = detalleDto.Idplato,
                    Cantidad = detalleDto.Cantidad,
                    Comentario = detalleDto.Comentario,
                    IdChef = 0,
                    Estado = "ENVI",
                    Usuario = await _serviceGeneral.ObtenerDatosConFiltroClase<Usuario>(x => x.Usuariologin == orderDto.usuario),
                    Pedido = pedido,
                    Plato = await _serviceGeneral.ObtenerDatosConFiltroClase<Plato>(p => p.IdPlato == detalleDto.Idplato)
                };
                await _serviceGeneral.Creacion(detallePedido);
            }

            return Ok(new { mensaje = "Pedido guardado exitosamente" });
        }
    }
}
