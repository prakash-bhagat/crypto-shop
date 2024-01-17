import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private api_url = environment.API_URL;

  constructor(private http:HttpClient) { }

  // Example: GET request
  public getAll() {
    const url = `${this.api_url}products`;
    return this.http.get<any>(url);
  }

  public singleProduct(id:any){
    const url = `${this.api_url}products/${id}`;
    return this.http.get<any>(url);
  }

  slider(){
    const url = `${this.api_url}slider`;
    return this.http.get<any>(url);
  }
  ads(){
    const url = `${this.api_url}banner`;
    return this.http.get<any>(url,{withCredentials:true});
  }

}
