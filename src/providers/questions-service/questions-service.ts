import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../../models/question';

/*
  Generated class for the QuestionsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionsServiceProvider {

  constructor(private _http: HttpClient) {}

  getFirstQuestion(){
    return this._http.get<Question>('http://localhost:8080/api/question/first_question');
  }

}
