using FramaFoodBE.Data;
using FramaFoodBE.Models;
using FramaFoodBE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FramaFoodBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly ServiceGeneral service;
        private readonly DbFramafoodContext _context;

        public UsuariosController(ServiceGeneral service, DbFramafoodContext context)
        {
            this.service = service;
            this._context = context;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(string usuario, string pass)
        {
            var user = await _context.Usuarios
                .Where(a => 
                a.Usuariologin == usuario && 
                a.Contrasena == pass).FirstOrDefaultAsync();

            var rol = await _context.Roles
                .Where(a => a.Idrol == user.Idrol).FirstOrDefaultAsync();

            if (user == null)
            {
                return BadRequest("Usuario o contraseña invalida");
            }

            return Ok(rol.Nombre);
        }

        [HttpGet("ObtenerUsuarios")]
        public async Task<ActionResult<IEnumerable<Usuario>>> ObtenerUsuarios()
        {
            var resultado = await service.ObtenerDatos<Usuario>();
            return Ok(resultado);
        }
    }
}
