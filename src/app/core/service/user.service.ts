import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '@environment/environment';
import { User } from '@core/model/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  login = (user:User) => {
    let header = new HttpHeaders({ "Accept": "application/json", 
                                   "password":user.password,  
                                   "app":environment.APP_TUTEN}); 
    const requestOptions = {  headers: header}; 
    return this.httpClient.put<any>(`${environment.URL_TUTEN}/user/${user.email}`,user,requestOptions);
  }
}
