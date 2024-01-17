import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private api_url = environment.API_URL;

  constructor(private http:HttpClient) { }

  // Example: GET request
  public getAll(data:any) {
    const url = `${this.api_url}orders`;
    return this.http.post<any>(url,data);
  }

  public getOne(data:any) {
    const url = `${this.api_url}order`;
    return this.http.post<any>(url,data);
  }

  COD(data:any){
    const url = `${this.api_url}placeorders`;
    return this.http.post<any>(url,data);
  }

  crypto(data:any){
    const url = `${this.api_url}placeorder`;
    return this.http.post<any>(url,data);
  }
}
