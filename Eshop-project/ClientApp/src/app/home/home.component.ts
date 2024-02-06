import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  public productData: HomeProductsDTO[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public router: Router ) {
    http.get<HomeProductsDTO[]>(baseUrl + 'products').subscribe(result => {
      this.productData = result;
    }, error => console.error(error));
  }
  shopNow() {
    this.router.navigate(['/products']);
  }
}
interface HomeProductsDTO {
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
