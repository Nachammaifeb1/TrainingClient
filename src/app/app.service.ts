import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions,RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Training} from './training-form/training-model'

const endpoint = 'http://localhost:49261/api/';
const HTTP_OPTIONS = {
  headers: new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS'
  })
};
@Injectable()
export class AppService {
  title = 'app';
  constructor(private http: Http) { }

  getTrainings(): Observable<any> {
   return this.http.get(endpoint + 'Training')
      .map(response => <Training>response.json());
  }
  postTraining(trg : any){
    var body = JSON.stringify(trg);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post(endpoint + 'Training',body,requestOptions).map(x => x.json());
  }

  // addProduct (product): Observable<any> {
  //   console.log(product);
  //   return this.http.post<any>(endpoint + 'products', JSON.stringify(product), httpOptions).pipe(
  //     tap((product) => console.log(`added product w/ id=${product.id}`)),
  //     catchError(this.handleError<any>('addProduct'))
  //   );
  // }
}
