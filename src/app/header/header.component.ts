import { Component, ElementRef } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  constructor(private route: Router) { }
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.log("login seller")
          this.menuType = 'seller';
          // seller name to show in display
          if (localStorage.getItem('seller')) {
            let sellerStore: any = localStorage.getItem('seller');
            let sellerData: any = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else {
          console.log("not seller")
          this.menuType = 'default';
        }
      }
    })
  }
  logOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
}
