import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_url = environment.API_URL;

  constructor(private http:HttpClient) { }

  // Example: GET request
  public getUserDetail(data:any) {
    const url = `${this.api_url}userinfo`;
    return this.http.post<any>(url,data);
  }

  userUpdate(data:any){
    const url = `${this.api_url}updateuser`;
    return this.http.post<any>(url,data);
  }
}
