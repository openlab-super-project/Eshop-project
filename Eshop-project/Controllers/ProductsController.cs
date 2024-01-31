using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eshop_project;
using Eshop_project.Data;
using Eshop_project.Models;
using System;
using System.Security.Claims;

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
        public IEnumerable<ProductsDTO> GetProductInformation() 
        {
            IEnumerable<ProductsDTO> dbProducts = _context.Products;

            return dbProducts.Select(dbProducts => new ProductsDTO
            {
                ProductId = dbProducts.ProductId,
                ProductName = dbProducts.ProductName,
                ProductDescription = dbProducts.ProductDescription,
                Price = dbProducts.Price,
                ProductCategory = dbProducts.ProductCategory,
                ProductImage0= dbProducts.ProductImage0,
                ProductImage1= dbProducts.ProductImage1,
                ProductImage2= dbProducts.ProductImage2,
            });
        }
    }
}

