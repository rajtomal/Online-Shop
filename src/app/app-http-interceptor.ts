import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ProductsService } from "./services/products.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private product:ProductsService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req).pipe(
            tap(event=>{
                this.product.loader.next(true)
                if(event.type == HttpEventType.Response){
                    if(event.status == 200){
                        this.product.loader.next(false)
                    }
                }
            })
        )
        
    }
}

