using FramaFoodBE.Models;
using FramaFoodBE.Services;
using FramaFoodBE.ServicesInterfaz;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FramaFoodBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "MESERA")]
    public class MesasController : ControllerBase
    {
        private readonly ServiceGeneral service;
        public MesasController(ServiceGeneral service) 
        {
            this.service = service;
        }

        [HttpPost("CreaciarMesas")]
        public async Task<ActionResult> CreaciarMesas(Mesa entidad)
        {
            return await service.Creacion(entidad);
        }

        [HttpPost("EditarMesas")]
        public async Task<ActionResult> EditarMesas(Mesa entidad)
        {
            return await service.Editar(entidad);
        }

        [HttpPost("EliminarMesas")]
        public async Task<ActionResult> EliminarMesas(Mesa entidad)
        {
            return await service.Eliminar(entidad);
        }

        [HttpGet("ObtenerMesas")]
        public async Task<ActionResult<IEnumerable<Mesa>>> ObtenerMesas()
        {
            var resultado = await service.ObtenerDatos<Mesa>();
            return Ok(resultado);
        }


    }
}
