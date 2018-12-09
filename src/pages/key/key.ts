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
  public isFirstQuestion : Boolean;

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
    this.isFirstQuestion = true;
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
      this.isFirstQuestion = false;
      if(option !== null){
        this.characteristcs.push(option);
      }
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
          }else if(this.families.length === 0 && this.characteristcs.length !== 0){
            this.showToastMessage("Não foram encontrados resultados com as características informadas :( Tente Novamente");
            this.ionViewDidLoad();
            loading.dismiss();
          }
        }
      );
      this._questionsService.getNextQuestion(this.questions, this.characteristcs, this.currentQuestion.id, option)
      .subscribe(
        (question) => {
          if(question == null){
            if(this.families.length > 0){
              this.navCtrl.push(SugestionsPage, {
                families :this.families
              })
            } 
          }
          this.questions.push(question);
          this.currentQuestion = question;
          console.log(this.questions);
          loading.dismiss();
        },
        (err) => {
          if(this.families.length > 0){
            this.navCtrl.push(SugestionsPage, {
              families :this.families
            })
          }else{
            this.showToastMessage("As informações fornecidas não foram suficientes para encontrar um resultado :(  Tente novamente!!");
            this.ionViewDidLoad();
          }
          loading.dismiss();
        }
      )
    
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
    if(image === undefined || image == null){
      image = '../assets/imgs/anansi.png'
    }
    return image;
  }

  restart(){
    this.ionViewDidLoad();
  }

}
