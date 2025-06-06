using FramaFoodBE.Models;
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
        public async Task<ActionResult<IEnumerable<string>>> VerPedidos()
        {
            var pedidos = await _service.ObtenerDatos<Detallepedido>();
            return Ok(pedidos);
        }
    }
}
