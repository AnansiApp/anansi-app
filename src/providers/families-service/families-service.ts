import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Family } from '../../models/family';
import { GenericService } from '../generic-service';
import { Option } from '../../models/option';

/*
  Generated class for the FamiliesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FamiliesServiceProvider extends GenericService{

  constructor(private _http: HttpClient) {
    super();
  }

  listFamilies() {
    return this._http.get<Family[]>(this.apiUrl + '/spider/families');
  }

  getByName(name) {
    return this._http.get<Family[]>(this.apiUrl + '/spider/families/get?name=' + name);
  }

  getImage(family){
    return this._http.get<Family[]>(this.apiUrl + '/spider/family-image?name=' + family);
  }

  getFamiliesByCharacteristcs(characteristcs: Option[]){
    var ids = "";

    if(characteristcs.length === 0){
      ids = "id=";
    } else {
      characteristcs.forEach(characteristc => {
        ids+= "id=" + characteristc.id + "&"; 
      });
    }

    return this._http.get<Family[]>(this.apiUrl + '/spider/characteristics?' + ids + '&')
  }

}
