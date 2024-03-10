﻿using Microsoft.AspNetCore.Mvc;
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
        [HttpGet]
        [Route("getProductsInfo")]
        public ProductsDTO getProductsInfo(string productName)
        {
            ProductsModel product = _context.Products.Where(p => p.ProductName == productName).FirstOrDefault();

            var info = new ProductsDTO
            {
                ProductId = product.ProductId,
                ProductName = productName,
                ProductDescription = product.ProductDescription,
                Price = product.Price,
                ProductCategory = product.ProductCategory,
                ProductImage0 = product.ProductImage0,
                ProductImage1 = product.ProductImage1,
                ProductImage2 = product.ProductImage2,
                Quantity = product.Quantity,
            };

            return info;
        }
    }
}
