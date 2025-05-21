using FramaFoodBE.Data;
using FramaFoodBE.ServicesInterfaz;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FramaFoodBE.Services
{
    public class ServiceGeneral : IGeneral
    {
        private readonly DbFramafoodContext dbcontext;

        public ServiceGeneral(DbFramafoodContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<ActionResult> Creacion<T>(T entidad) where T : class
        {
            try
            {
                dbcontext.Set<T>().Add(entidad);
                await dbcontext.SaveChangesAsync();
                return new OkObjectResult("Entidad creada correctamente.");
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult($"Error al crear: {ex.Message}");
            }
        }

        public async Task<ActionResult> Editar<T>(T entidad) where T : class
        {
            try
            {
                dbcontext.Set<T>().Update(entidad);
                await dbcontext.SaveChangesAsync();
                return new OkResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult($"Error al editar: {ex.Message}");
            }
        }


        public async Task<ActionResult> Eliminar<T>(T entidad) where T : class
        {
            try
            {
                dbcontext.Set<T>().Remove(entidad);
                await dbcontext.SaveChangesAsync();
                return new OkResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult($"Error al eliminar: {ex.Message}");
            }
        }

        public async Task<ActionResult> EliminarId<T>(int id) where T : class
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<T>> ObtenerDatos<T>() where T : class
        {
            return await dbcontext.Set<T>().ToListAsync();
        }

    }
}
