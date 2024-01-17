import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api_url = environment.API_URL;
  private isAuthenticated = new Subject<string>();
  private isLogout = new Subject<any>();
  private authView = new BehaviorSubject<any>(this.getToken()===null?false:true);

  constructor(private http:HttpClient){}

  // Mock login (replace with actual authentication logic)
  login(data:any) {
    // Example: Check if the mobile and password match (mocked for simplicity)
    // const isValidUser = mobile === '1234567890' && password === 'password';

    const url = `${this.api_url}login`;
     this.http.post<any>(url,data).subscribe((loggedIn:any) => {
      if (loggedIn.status === true) {
        // console.log('Login successful',loggedIn);
        localStorage.setItem('token',loggedIn.token);
        localStorage.setItem('_s',loggedIn.status);
        var obj:any =[{
          e:loggedIn.user[0].email,
          m:loggedIn.user[0].mobile,
          n:loggedIn.user[0].name
        }]
        localStorage.setItem('_u',JSON.stringify(obj));
        this.readToken();
        this.authView.next(true);
       return this.isAuthenticated.next(loggedIn);
      } else {
        // console.error('Invalid credentials',loggedIn);
        localStorage.setItem('_s',loggedIn.status);
        this.authView.next(false);
       return this.isAuthenticated.next(loggedIn);
      }
    });
  }

  isAuth(): Observable<string> {
    return this.isAuthenticated.asObservable();
  }

  isAuthSetView() {
    this.authView.next(this.getToken())
  }

  isAuthGetView(): Observable<any[]> {
    return this.authView.asObservable();
  }


  signup(data:any){
    const url = `${this.api_url}signup`;
    return this.http.post<any>(url,data);
  }

  // Logout
  logout(): void {
    localStorage.setItem('_s','false');
    localStorage.removeItem('token');
    localStorage.removeItem('_u');
    this.isAuthenticated.next('false')
    this.authView.next(false);
    // this.isLogout.next(localStorage.getItem('_s'));
  }

  getToken() {
    return localStorage.getItem('token');
   //  localStorage.getItem('info');
 }

 readToken () {
  const token:any = this.getToken();
  if (token !== null) {
    var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  // return JSON.parse(jsonPayload);
  const data = JSON.parse(jsonPayload);
  const expirationInSeconds = new Date(data.exp).getTime()-new Date(data.iat).getTime();
  const timeout = expirationInSeconds * 1000 + new Date().getTime();
  // console.log(new Date(),">>",new Date(timeout))
  // console.log(new Date(timeout) <= new Date())
  
  // setTimeout(() => {
  //   this.logout();
  //   this.authView.next(false);
  //   // window.location.reload();
  // }, 120*1000);
  }
}

}
