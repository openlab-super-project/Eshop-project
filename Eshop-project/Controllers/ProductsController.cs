using Microsoft.AspNetCore.Mvc;
using Eshop_project.Data;
using Eshop_project.Models;

namespace Eshop_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<ProductsDTO> GetProductInformation()
        {
            IEnumerable<ProductsModel> dbProducts = _context.Products;

            return dbProducts.Select(dbProducts => new ProductsDTO
            {
                ProductId = dbProducts.ProductId,
                ProductName = dbProducts.ProductName,
                ProductDescription = dbProducts.ProductDescription,
                Price = dbProducts.Price,
                ProductCategory = dbProducts.ProductCategory,
                ProductImage0 = dbProducts.ProductImage0,
                ProductImage1 = dbProducts.ProductImage1,
                ProductImage2 = dbProducts.ProductImage2,
                Quantity = dbProducts.Quantity,
            });
        }

        [HttpPut("create")]
        public ActionResult<ProblemsDTO> CreateProblem([FromBody] ProblemsDTO problemsDTO)
        {
            try
            {
                using (var context = _context)
                {
                    var newProblem = new ProblemsModel
                    {
                        NameSurname = problemsDTO.NameSurname,
                        Email = problemsDTO.Email,
                        Problem = problemsDTO.Problem
                    };

                    context.Problems.Add(newProblem);
                    context.SaveChanges();

                    var info = new ProblemsDTO
                    {
                        NameSurname = problemsDTO.NameSurname,
                        Email = problemsDTO.Email,
                        Problem = problemsDTO.Problem
                    };

                    return Ok(info);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error");
                return StatusCode(500, new { message = "Mame problem." });
            }
        }
    }
}
