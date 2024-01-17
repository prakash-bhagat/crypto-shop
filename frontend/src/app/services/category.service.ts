import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private api_url = environment.API_URL;

  constructor(private http:HttpClient) { }

  // Example: GET request
  public getAll() {
    const url = `${this.api_url}category`;
    return this.http.get<any>(url);
  }
  
}
