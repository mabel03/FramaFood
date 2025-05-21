using Microsoft.AspNetCore.Mvc;

namespace FramaFoodBE.ServicesInterfaz
{
    public interface IGeneral
    {
        Task<ActionResult> Creacion<T>(T entidad) where T : class;
        Task<ActionResult> Editar<T>(T entidad) where T : class;
        Task<ActionResult> Eliminar<T>(T entidad) where T : class;
        Task<ActionResult> EliminarId<T>(int id) where T : class;

    }
}
