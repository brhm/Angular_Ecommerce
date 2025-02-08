import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  api:string="http://localhost:5000/api";


  constructor(
    private _http:HttpClient
  ) { }


  get<T>(api:string,callBack:(res:T)=>void){
    this._http.get<T>(`${this.api}/${api}`,{}).subscribe({
      next:(res:T)=>callBack(res),
      error:(err:HttpErrorResponse)=>{
        console.log(err);
      }
    });
  }

  //auth/register
  post<T>(api:string,model:any,callBack:(res:T)=>void){
    this._http.post<T>(`${this.api}/${api}`,model,{}).subscribe({
      next:(res:T)=>callBack(res),
      error:(err:HttpErrorResponse)=>{
        console.log(err);
      }
    });
  }

}
