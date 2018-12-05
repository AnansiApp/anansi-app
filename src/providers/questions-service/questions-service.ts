import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../../models/question';
import { Option } from '../../models/option';
import { GenericService } from '../generic-service';

/*
  Generated class for the QuestionsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionsServiceProvider extends GenericService{

  constructor(private _http: HttpClient) {
    super();
  }

  getFirstQuestion(){
    return this._http.get<Question>(this.apiUrl + '/question/first_question');
  }

  getNextQuestion(questionId, optionId){
    return this._http.get<Question>(this.apiUrl + '/question/next_question?idCurrentQuestion=' 
    + questionId + '&idOption=' + optionId);
  }

  getNextQuestionNoOption(questions: Question[]){
    var ids = "";
    questions.forEach(question => {
      ids+= "id=" + question.id + "&"; 
    });
    return this._http.get<Question>(this.apiUrl + '/question/next_question_index_random?' + ids);
  }
  

  getOptionImage(option: Option){
    return this.apiUrl + '/question/option_image?address=' 
    + option.imageAddress;
  }

}