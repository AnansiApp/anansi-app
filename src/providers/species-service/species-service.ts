import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specie } from '../../models/specie';

/*
  Generated class for the SpeciesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpeciesServiceProvider {

  constructor(private _http: HttpClient) {

  }

  list() {
    return this._http.get<Specie[]>('http://localhost:8080/species');
  }

}
