using FramaFoodBE.Data;
using FramaFoodBE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FramaFoodBE.Services
{
    public class UsuarioService
    {
        private readonly DbFramafoodContext _dbFramafoodContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UsuarioService(DbFramafoodContext dbFramafoodContext, IHttpContextAccessor httpContextAccessor)
        {
            this._dbFramafoodContext = dbFramafoodContext;
            this._httpContextAccessor = httpContextAccessor;
        }

        public string GenerarToken(Usuario user)
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

            // Fix for CS0162: Removed unreachable code.
        }

        public async Task<Usuario?> ObtenerUsuarioActual()
        {
            var User = _httpContextAccessor.HttpContext?.User;
            if (User == null)
            {
                return null;
            }

            var userIdClaim = User.Claims.FirstOrDefault(x => x.Type == "id");
            if (userIdClaim == null)
            {
                return null;
            }

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return null;
            }

            return await _dbFramafoodContext.Usuarios
                .Include(x => x.Role)
                .FirstOrDefaultAsync(u => u.Idusuario == userId);

        }
    }
}
