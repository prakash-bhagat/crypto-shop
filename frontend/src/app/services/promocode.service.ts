import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromocodeService {

  private api_url = environment.API_URL;

  constructor(private http:HttpClient) { }

  // Example: GET request
   getPromoCode(data:any) {
    const url = `${this.api_url}promo-code`;
    return this.http.post<any>(url,data);
}
}
