import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http'
import { Specie } from '../../models/specie';
import { SpeciesServiceProvider } from '../../providers/species-service/species-service';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycle';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage implements NavLifecycles {

  public species: Specie[];

  constructor(public navCtrl: NavController, 
    private _loadingCtrl: LoadingController,
    private _speciesService: SpeciesServiceProvider,
    private _alertCtrl: AlertController) {}

  ionViewDidLoad() {
      this.loadSpecies();
  }

  getSpecies(ev: any){
    let loading = this._loadingCtrl.create({
      content: "Carregando..."
    });
    const filter = ev.target.value;
    this._speciesService.getByName(filter)
    .subscribe(
      (species) => {
        this.species = species;
        loading.dismiss();
      },
    );      

    }

    loadSpecies(filter?){
      let loading = this._loadingCtrl.create({
        content: "Carregando..."
      });
  
      loading.present();
  
      this._speciesService.listSpecies()
      .subscribe(
        (species) => {
          this.species = species;
          loading.dismiss();
        },
        (err: HttpErrorResponse) => {
          loading.dismiss();
          this._alertCtrl.create({
            title: 'Falha ao carregar',
            subTitle: 'Não foi possivel carregar',
            buttons: [
              { text: 'Ok'}
            ]
          }).present();
        }
      );
    }

  selectSpecie(specie: Specie){
      this.navCtrl.push(DetailPage, {
        specie: specie
      });
  }

}
