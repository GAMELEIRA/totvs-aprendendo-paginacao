import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private urlBase = 'https://app-demo-portinari-api.herokuapp.com/api/samples/v1/people';

  constructor(private _http: HttpClient) { }

  public buscarPessoas(page = 1): Observable<any> {
    const url = this.urlBase.concat(`?page=${page}`);
    return this._http.get(url);
  }

}
