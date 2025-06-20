using FramaFoodBE.Data;
using FramaFoodBE.Models;
using FramaFoodBE.Models.ViewModels;
using FramaFoodBE.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FramaFoodBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly ServiceGeneral service;
        private readonly DbFramafoodContext _context;
        private readonly IConfiguration _configuration;
        private readonly UsuarioService _usuarioService;


        public UsuariosController(ServiceGeneral service, DbFramafoodContext context, IConfiguration configuration, UsuarioService usuarioService)
        {
            this.service = service;
            this._context = context;
            this._configuration = configuration;
            this._usuarioService = usuarioService;
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            var user = await _context.Usuarios
                .Include(u => u.Role)
                .FirstOrDefaultAsync(a => a.Usuariologin == login.Usuario && a.Contrasena == login.Pass);

            if (user == null)
            {
                return BadRequest("Usuario o contraseña inválida");
            }

            var token = GenerarToken(user);
            return Ok(new { Token = token, Rol = user.Role.Nombre , NombreUsuario= user.Nombre, usuario=user.Usuariologin});
        }


        [HttpGet("ObtenerUsuarios")]
        public async Task<ActionResult<IEnumerable<Usuario>>> ObtenerUsuarios()
        {
            var resultado = await service.ObtenerDatos<Usuario>();
            //var usuarioLoger = await ObtenerUsuarioActual();
            return Ok(resultado);
        }

        private string GenerarToken(Usuario user)
        {
            var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, user.Usuariologin),
        new Claim("id", user.Idusuario.ToString()),
        new Claim(ClaimTypes.Role, user.Role.Nombre),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            var claveSecreta = "MiClaveSuperSecretaQueEsMuyLargaYSegura1234";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(claveSecreta));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "MiApi",
                audience: "MisUsuarios",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        [HttpGet("ObtenerUsuarioActual")]
        public async Task<IActionResult> UsuarioActural()
        {
            var usuario = await _usuarioService.ObtenerUsuarioActual();
            if(usuario == null)
            {
                return Unauthorized();
            }

            return Ok(usuario);
        }



    }
}
