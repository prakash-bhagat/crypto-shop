import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'; 

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  messages(result:any,data:any){
    if (result.isConfirmed) {
      return Swal.fire({
        title:data.accept,
        confirmButtonText:'Ok'
      });
    } else {
      return Swal.fire({title:data.close,showConfirmButton:false,timer:1000});
    }
   }
   
   isConfirmed(data:any){
    return Swal.fire({
      title:data.title,
      text:data.text,
      icon:data.icon,
      confirmButtonText:'Ok',
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
   }

  success(title:string){
   return Swal.fire({
    title: title,
    showDenyButton: true,
    showCancelButton: false,
    denyButtonText: `Close`,
    confirmButtonText: "Yes",
    allowOutsideClick: false,
    allowEscapeKey: false,
    reverseButtons:true,
    showCloseButton:false,
    });
  }

  swalGlobalConfig={
    allowOutsideClick: false,
    allowEscapeKey: false,
    reverseButtons:true,
    showCloseButton:false,
  }
}
