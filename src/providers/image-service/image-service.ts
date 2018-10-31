import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../generic-service';

/*
  Generated class for the ImageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageServiceProvider extends GenericService {

  constructor(public http: HttpClient) {
    super();
  }

  getImage(address){
    return this.apiUrl + '/image/get?address=' 
    + address;
  }

}
