using Eshop_project.Data;
using Eshop_project.Models;
using Microsoft.AspNetCore.Mvc;

namespace Eshop_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("products")]
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
            });
        }
    }
}
