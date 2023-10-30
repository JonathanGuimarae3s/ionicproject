import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../interface/client';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  apiUrl = 'http://127.0.0.1:8000/api/client';
  constructor(private http: HttpClient) { }
  public create(client: Client) {
    return this.http.post<Client>(this.apiUrl, client);


  }
  public getUser(id:any){
    return this.http.get(this.apiUrl+'/'+ id);

  }
}
