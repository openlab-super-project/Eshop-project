import { Component, NgModule, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent{

  public ProductData: ProductsDTO[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<ProductsDTO[]>(baseUrl + 'products').subscribe(result => {
      this.ProductData = result;
    }, error => console.error(error))
  }

}
interface ProductsDTO {
  productId: number;
  productName: string;
  productDescription: string;
  price: number;
  productCategory: string;
  productImage0: string;
  productImage1: string;
  productImage2: string;
}
