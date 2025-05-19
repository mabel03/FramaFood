using Microsoft.AspNetCore.Mvc;

namespace FramaFoodBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChefController : ControllerBase
    {
        // GET: api/<ChefController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ChefController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ChefController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ChefController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ChefController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
