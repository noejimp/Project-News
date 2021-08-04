import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  current_date = new Date();
  today: number = Date.now();
  public lstNews: any = [];
  country = ''; //&country=us';
  criterio = '&q=Sports';


  urlBase = 'https://newsapi.org/v2/everything?sortBy=popularity&language=es';

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _service: RestService
  ) { }

  ngOnInit(): void {
    this.loadNews(this.urlBase);
  }

  loadNews(url: any){
    console.log(url)
    this._service.get(url)
    .subscribe(data => {
      this.lstNews = data["articles"];
    })
  }

  getCountry(){
    let ct = '';
    this._service.get('https://ipinfo.io/187.200.129.90?token=75b635b283653c')
    .subscribe(data => {
      console.log(data);
      ct = data["country"];       
    })
    return ct;    
  }

  refresh(): void {
    window.location.reload();
  }

  searchInt() {   
    this.criterio = '&q=International';
    this.loadNews(this.urlBase + this.criterio);
  }

  getLocal() {
    let ct: any = this.getCountry();
    this.loadNews(this.urlBase + '&country=' + ct.toLowerCase());
  }


  logout() {
    this._auth.clearStorage()
    this._router.navigate(['login']);
  }

}
