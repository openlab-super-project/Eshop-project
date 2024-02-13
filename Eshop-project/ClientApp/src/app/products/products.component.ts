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

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.http.get<ProductsDTO[]>(this.baseUrl + 'products').subscribe(result => {
      this.productData = result;
      this.ourFilteredProducts = this.productData;
    }, error => console.error(error));
  }

  //PANEL CATEGORIES

  filterProducts(category: string) {
    this.ourFilteredProducts = this.productData;
    this.ourFilteredProducts = this.productData.filter(product => product.productCategory === category); // for each cateogory
  }

  // TRIEDICKA
  sortDataFirst() {
    this.ourFilteredProducts = this.productData;
    this.ourFilteredProducts.sort((a, b) => b.price - a.price); // from most expensive
  }

  sortDataSecond() {
    this.ourFilteredProducts = this.productData;
    this.ourFilteredProducts.sort((a, b) => a.price - b.price); // from least expensive
  }

  showAvaiableProducts() {
    this.ourFilteredProducts = this.productData.filter(product => product.quantity > 0); // are available
  }

  showAllProducts() {
    this.ourFilteredProducts = this.productData;
    this.ourFilteredProducts.sort((a, b) => a.productId - b.productId); // show all products
  }

  filtersProducts() {
    if (!this.searchText.trim()) {
      this.ourFilteredProducts = this.productData;
    } else {
      this.ourFilteredProducts = this.productData.filter(product =>
        product.productName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  onSortChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'mostExpensive') {
      this.sortDataFirst();
    } else if (selectedValue === 'leastExpensive') {
      this.sortDataSecond();
    }
    else if (selectedValue === 'isAvailable') {
      this.showAvaiableProducts();
    }
    else if (selectedValue === 'all') {
      this.showAllProducts();
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
