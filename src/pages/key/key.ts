import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController} from 'ionic-angular';
import { Question } from '../../models/question';
import { QuestionsServiceProvider } from '../../providers/questions-service/questions-service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycle';
import { Option } from '../../models/option';
import { ImageServiceProvider } from '../../providers/image-service/image-service';
import { SpeciesServiceProvider } from '../../providers/species-service/species-service';
import { Specie } from '../../models/specie';
import { SugestionsPage } from '../sugestions/sugestions';

@Component({
  selector: 'page-key',
  templateUrl: 'key.html'
})
export class KeyPage implements NavLifecycles{

  public currentQuestion: Question;
  public questions: Question[];
  public characteristcs: Option[] = [];
  public species: Specie[];

  constructor(public navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private _questionsService: QuestionsServiceProvider,
    private _speciesService: SpeciesServiceProvider,
    private _imageService: ImageServiceProvider,
    private _alertCtrl: AlertController) {
    }

  ionViewDidLoad() {
    this.getFirstQuestion();
    this.characteristcs = [];
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
    this.characteristcs.push(option);
    let loading = this._loadingCtrl.create({
      content: "Carregando..."
    });

    loading.present();
    this._speciesService.getSpeciesByCharacteristcs(this.characteristcs).
    subscribe(
      (species) => {
        this.species = species;
        if(this.species.length < 2){
          this.navCtrl.push(SugestionsPage, {
            species :this.species
          })
        }
        loading.dismiss();
      }
    );
    this._questionsService.getNextQuestion(this.currentQuestion.id, option.id)
    .subscribe(
      (question) => {
        this.currentQuestion = question;
      }
    )
  }

  getOptionImage(option: Option){
    return this._imageService.getImage(option.imageAddress);
  }

}
