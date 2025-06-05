using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

namespace FramaFoodBE.ServicesInterfaz
{
    public interface IGeneral
    {
        Task<ActionResult> Creacion<T>(T entidad) where T : class;
        Task<ActionResult> Editar<T>(T entidad) where T : class;
        Task<ActionResult> Eliminar<T>(T entidad) where T : class;
        Task<ActionResult> EliminarId<T>(int id) where T : class;
        Task<IEnumerable<T>> ObtenerDatosConFiltro<T>(Expression<Func<T, bool>>? filtro = null) where T : class;
        Task<IEnumerable<T>> ObtenerDatos<T>() where T : class;
    }
}
