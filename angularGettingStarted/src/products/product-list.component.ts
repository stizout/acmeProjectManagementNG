import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';


@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})



export class ProductListComponent implements OnInit {
    constructor(private productService: ProductService) {
      this.input = ''
    }
    input = '';
    pageTitle: string = 'Product List: ';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    filteredProducts: IProduct[];
    products: IProduct[] = [];
    errorMessage: string;

    
    // get userInput(): string {
      //   console.log("getter firing", this.input)
      //   return this.input;
      // }
      set userInput(input: string) {
        this.input = input.toLocaleLowerCase()
        console.log("setter firing", this.input)
        this.filteredProducts = this.handleFilter(this.input);
      }
      
      handleFilter(input: string) {
        return this.products.filter((product) => product.productName.toLocaleLowerCase().indexOf(input) !== -1)
      }
      
      toggleImage() {
        this.showImage = !this.showImage;
      }
      
      ngOnInit(): void {
        this.productService.getProducts().subscribe(
          products => {
            this.products = products;
            console.log(products)
            this.filteredProducts = this.products;
          },
          error => this.errorMessage = <any>error
        );
        }
    onRatingClicked(message) {
      console.log('firing', message)
      this.pageTitle = 'Product List: ' + message
    }
}