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

  sortDataFirst() {
    this.productData.sort((a, b) => b.price - a.price); // from most expensive
  }

  sortDataSecond() {
    this.productData.sort((a, b) => a.price - b.price); // from least expensive
  }
  onSortChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'mostExpensive') {
      this.sortDataFirst();
    } else if (selectedValue === 'leastExpensive') {
      this.sortDataSecond();
    }
  }
}

export interface ProductsDTO {
  productId: number;
  productName: string;
  productDescription: string;
  price: number;
  productCategory: string;
  productImage0: string;
  productImage1: string;
  productImage2: string;
  quantity: number;
}
