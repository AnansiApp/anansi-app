import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Specie } from '../../models/specie';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the SugestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sugestions',
  templateUrl: 'sugestions.html',
})
export class SugestionsPage {

  public species: Specie[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.species = this.navParams.get('species');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SugestionsPage');
  }

  selectSpecie(specie: Specie){
    this.navCtrl.push(DetailPage, {
      specie: specie
    });
}

}
