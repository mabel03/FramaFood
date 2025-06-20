using FramaFoodBE.Models;
using FramaFoodBE.Models.ViewModels;
using FramaFoodBE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FramaFoodBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoDetalleController : ControllerBase
    {
        private readonly ServiceGeneral _service;
        public PedidoDetalleController(ServiceGeneral service) { 
            this._service = service;
        }

        [HttpGet("VerPedidos")]
        public async Task<ActionResult<IEnumerable<Detallepedido>>> VerPedidos()
        {
            var pedidos = await _service.ObtenerDatos<Detallepedido>();
            var plantos = await _service.ObtenerDatos<Plato>();
            var Pedido = await _service.ObtenerDatosConFiltroEIncluidos<Pedido>(
                p => p.Estado == "PEND"
            );

            var Mesa = await _service.ObtenerDatosConFiltroEIncluidos<Mesa>(
                m => m.IdMesa == Pedido.Select(p => p.IdMesa).FirstOrDefault()
            );

            var DetallePedidos = pedidos.Select(p => new DetallePedidoDto
            {
                IdDetalle = p.IdDetalle,
                IdPlato = p.IdPlato,
                NombrePlato = plantos.SingleOrDefault(pl => pl.IdPlato == p.IdPlato)?.Nombre ?? "No disponible",
                Cantidad = p.Cantidad,
                Estado = p.Estado,
                Comentario = p.Comentario,
                IdChef = p.IdChef,
                Mesa = Mesa.SingleOrDefault(m => m.IdMesa == p.Pedido.IdMesa)?.Numero ?? "No disponible",
                IdPedido = p.IdPedido
            }).ToList();

            return Ok(DetallePedidos);
        }

        [HttpPut("ActualizarDetalle/{id}")]
        public async Task<ActionResult> ActualizarDetalle([FromBody] DetallePedidoDto detallepedido)
        {
            var detalle = await _service.ObtenerDatosConFiltro<Detallepedido>(dp => dp.IdDetalle == detallepedido.IdDetalle);
            var Pedidos = await _service.ObtenerDatosConFiltro<Pedido>(p => p.IdPedido == detalle.FirstOrDefault().IdPedido);
            var plato = await _service.ObtenerDatosConFiltro<Plato>(platos => platos.IdPlato == detalle.FirstOrDefault().IdPlato);
            var usuario = await _service.ObtenerDatosConFiltro<Usuario>(u => u.Idusuario == detalle.FirstOrDefault().IdChef);

            Detallepedido obj = detalle.FirstOrDefault();
            Pedido objPendiente = Pedidos.FirstOrDefault();
            Plato objePlato = plato.FirstOrDefault();
            Usuario objeUsuario = usuario.FirstOrDefault();

            try
            {
                //bool resultadoCoci = detalle.All(x => x.Estado == "COCI" && x.IdPedido == objPendiente.IdPedido);
                bool resultListo = detalle.All(x => x.Estado == "LIST" && x.IdPedido == objPendiente.IdPedido);
                obj.Plato = objePlato;
                obj.Usuario = objeUsuario;

                if (obj.Estado == "ENVI")
                {
                    obj.Estado = "COCI";
                    objPendiente.Estado = "PREP";
                    await _service.Editar(objPendiente);
                }
                else if (obj.Estado == "COCI")
                {
                    obj.Estado = "LIST";
                    await _service.Editar(objPendiente);
                }

                if (resultListo == true)
                {
                    objPendiente.Estado = "LIST";
                    await _service.Editar(objPendiente);
                }



                //objPendiente.Estado = "PREP";
                //await _service.Editar(objPendiente);
                //await _service.Editar(obj);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar el detalle: {ex.Message}");
            }

            return Ok(obj);
        }
    }
}
