import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle = 'Product Detail'
  products = [];
  product = {};

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private router: Router,
    ) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.product = this.productService.getProducts().subscribe(
      products => {
        this.product = products.find((product) => product.productId === id)
      }
    );
  }

  handleBackButton(): void {
    this.router.navigate(['/products'])
  }

}
