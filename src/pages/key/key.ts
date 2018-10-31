import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Question } from '../../models/question';
import { QuestionsServiceProvider } from '../../providers/questions-service/questions-service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycle';
import { Option } from '../../models/option';

@Component({
  selector: 'page-key',
  templateUrl: 'key.html'
})
export class KeyPage implements NavLifecycles{

  public currentQuestion: Question;
  public questions: Question[];

  constructor(public navCtrl: NavController,
    private _questionsService: QuestionsServiceProvider,
    private _alertCtrl: AlertController) {
    }

  ionViewDidLoad() {
    this.getFirstQuestion();
  }

  ionViewDidEnter(){
    this.ionViewDidLoad();
  }

  getFirstQuestion(){
    this._questionsService.getFirstQuestion()
    .subscribe(
      (question) => {
        this.currentQuestion = question;
      },
      (err: HttpErrorResponse) => {
        this._alertCtrl.create({
          title: 'Falha ao carregar',
          subTitle: 'Não foi possivel carregar',
          buttons: [
            { text: 'Ok'}
          ]
        }).present();
      }
    )    
  }

  selectResponse(option: Option){
    this._questionsService.getNextQuestion(this.currentQuestion.id, option.id)
    .subscribe(
      (question) => {
        this.currentQuestion = question;
      }
    )
  }

  getOptionImage(option: Option){
    return this._questionsService.getOptionImage(option);
  }

}
