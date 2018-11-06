import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specie } from '../../models/specie';
import { GenericService } from '../generic-service';
import { Option } from '../../models/option';

/*
  Generated class for the SpeciesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpeciesServiceProvider extends GenericService{

  constructor(private _http: HttpClient) {
    super();
  }

  listSpecies() {
    return this._http.get<Specie[]>(this.apiUrl + '/spider/species');
  }

  getByName(name) {
    return this._http.get<Specie[]>(this.apiUrl + '/spider/species/get?name=' + name);
  }

  getImage(specie){
    return this._http.get<Specie[]>(this.apiUrl + '/spider/specie-image?name=' + specie);
  }

  getSpeciesByCharacteristcs(characteristcs: Option[]){
    var ids = "";
    characteristcs.forEach(characteristc => {
      ids+= "id=" + characteristc.id + "&"; 
    });
    return this._http.get<Specie[]>(this.apiUrl + '/spider/characteristics?' + ids)
  }

}
