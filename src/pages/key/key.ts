import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController} from 'ionic-angular';
import { Question } from '../../models/question';
import { QuestionsServiceProvider } from '../../providers/questions-service/questions-service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycle';
import { Option } from '../../models/option';
import { ImageServiceProvider } from '../../providers/image-service/image-service';
import { FamiliesServiceProvider } from '../../providers/families-service/families-service';
import { Family } from '../../models/family';
import { SugestionsPage } from '../sugestions/sugestions';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-key',
  templateUrl: 'key.html'
})
export class KeyPage implements NavLifecycles{

  public currentQuestion: Question;
  public questions: Question[] = [];
  public characteristcs: Option[] = [];
  public families: Family[];

  constructor(public navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private _questionsService: QuestionsServiceProvider,
    private _familiesService: FamiliesServiceProvider,
    private _imageService: ImageServiceProvider,
    private _toastCtrl: ToastController,
    private _alertCtrl: AlertController) {
    }

  ionViewDidLoad() {
    this.getFirstQuestion();
    this.characteristcs = [];
    this.questions = [];
    this.families = [];
  }

  ionViewDidEnter(){
    this.ionViewDidLoad();
  }

  getFirstQuestion(){
    this._questionsService.getFirstQuestion()
    .subscribe(
      (question) => {
        this.currentQuestion = question;
        this.questions.push(question);
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
    if(option === null){
      this._questionsService.getNextQuestionNoOption(this.questions)
      .subscribe(
        (question) => {
          console.log(question);
          this.questions.push(question);
          this.currentQuestion = question;
        },
        err => {
          this.showToastMessage("As informações fornecidas não foram suficientes para encontrar um resultado :(");
          this.ionViewDidLoad();
        }
      )
    } else{
      this.characteristcs.push(option);
      let loading = this._loadingCtrl.create({
        content: "Carregando..."
      });

      loading.present();
      this._familiesService.getFamiliesByCharacteristcs(this.characteristcs).
      subscribe(
        (families) => {
          this.families = families;
          if(this.families.length < 2 && this.families.length > 0){
            this.navCtrl.push(SugestionsPage, {
              families :this.families
            })
          }else if(this.families.length === 0){
            this.showToastMessage("Não foram encontrados resultados com as características informadas :( Tente Novamente");
            this.ionViewDidLoad();
          }
          loading.dismiss();
        }
      );
      this._questionsService.getNextQuestion(this.currentQuestion.id, option.id)
      .subscribe(
        (question) => {
          this.questions.push(question);
          this.currentQuestion = question;
        }
      )
    }
  }

  async showToastMessage(message){
    const toast = this._toastCtrl.create({
      message: message,
      duration: 5000,
      position: "middle"
    });
    toast.present();
    setTimeout(() => {
    }, 5000);
  }

  getOptionImage(option: Option){
    var image = this._imageService.getImage(option.imageAddress);
    console.log(image);
    if(image === undefined || image == null){
      image = '../assets/imgs/anansi.png'
    }
    return image;
  }

}
