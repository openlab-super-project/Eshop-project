import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchPipe } from './search.pipe';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  public productData: ProductsDTO[] = [];
  public ourFilteredProducts: ProductsDTO[] = [];

  searchText: any;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<ProductsDTO[]>(baseUrl + 'products').subscribe(result => {
      this.productData = result;
    }, error => console.error(error));
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
