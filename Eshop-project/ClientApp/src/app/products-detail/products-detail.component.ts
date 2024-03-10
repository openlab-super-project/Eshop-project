import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit {
  public productsInfo: ProductsDTO[] = [];
  public productName: string = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private route: ActivatedRoute) { }

  getProductsInfo(productName: string): Observable<ProductsDTO[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("productName", productName);

    return this.http.get<ProductsDTO[]>(this.baseUrl + 'products/getProductsInfo', { params: queryParams });
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.productName = String(routeParams.get('productName'));

    this.getProductsInfo(this.productName).subscribe(
      result => { this.productsInfo = result; console.log(this.productsInfo); },
      error => console.error(error)
    );

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
