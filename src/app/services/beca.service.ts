import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Beca } from '../models/beca';

@Injectable({
  providedIn: 'root'
})
export class BecaService {

  url : string = "https://localhost:44344/api/Beca";

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }

  save(b:Beca) : Observable<any> {
    let becaBody = JSON.stringify(b);    
    if(b.idbeca === undefined){      
      return this.http.post<any>(this.url, becaBody, this.httpOptions);
    }
    return this.http.put<any>(this.url, becaBody, this.httpOptions);
  }

    retrieve(id:number): Observable<Beca> {
      return this.http.get<Beca>(this.url + "/" + id, this.httpOptions)
        .pipe(
          retry(1)
        );
    } 

  delete(b: Beca) : Observable<any> {
    return this.http.delete<any>(this.url + '/' + b.idbeca, 
      this.httpOptions);
  }

  list(): Observable<Beca[]> {
    return this.http.get<Beca[]>(this.url, this.httpOptions)
      .pipe(
        retry(1)
      );
  }

}
