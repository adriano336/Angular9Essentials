import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe((product) => {
      this.product = product;      
    });
  }

  deleteProduct(): void {
    const id = +this.activeRoute.snapshot.params['id'];
    this.productService.delete(id).subscribe((product) => {
      this.productService.showMessage("Produto excluído com sucesso!");
      this.cancel();
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
