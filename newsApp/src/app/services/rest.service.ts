import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  API_KEY = '76426b43f7d04579937aa9fa325e3666';

  constructor(
    private http: HttpClient
  ) { }

  public get(url: string) {
    return this.http.get(url + '&apiKey=' + this.API_KEY); // Get
  }

  public post(url: string, body){
    return this.http.post(url, body);
  }
}
