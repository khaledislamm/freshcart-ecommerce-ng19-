import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  imports: [TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  products: IProduct[] = [];
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  ngOnInit(): void {
    this.getAllWishlistProducts();
  }
  getAllWishlistProducts(): void {
    this.wishlistService.getAllWishlistProducts().subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.products = res.data;
        }
      }
    })
  }
  removeProductFromWishlist(id: string): void {
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        if (res.status === "success") {
          let productIds: string[] = res.data;
          localStorage.setItem('productIds', JSON.stringify(productIds));
          this.toastrService.success(res.message);
          this.getAllWishlistProducts();
        }
      }
    })
  }
}
