import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../../models/question';
import { Option } from '../../models/option';

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

  getNextQuestion(question, option){
    return this._http.get<Question>('http://localhost:8080/api/question/next_question?idCurrentQuestion=' 
    + question + '&idOption=' + option);
  }

  getOptionImage(option: Option){
    return 'http://localhost:8080/api/question/option_image?address=' 
    + option.imageAddress;
  }

}