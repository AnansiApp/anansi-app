import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ImageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageServiceProvider {

  constructor(public http: HttpClient) {}

  getImage(address){
    return 'http://localhost:8080/api/image/get?address=' 
    + address;
  }

}
