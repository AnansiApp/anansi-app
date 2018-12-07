import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Family } from '../../models/family';
import { DetailPage } from '../detail/detail';
import { ImageServiceProvider } from '../../providers/image-service/image-service';

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

  public families: Family[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _imageService: ImageServiceProvider
    ) {
    this.families = this.navParams.get('families');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SugestionsPage');
  }

  selectFamily(family: Family){
    this.navCtrl.push(DetailPage, {
      family: family
    });
  }

  getPrincipalImage(address: String){
    var image = this._imageService.getImage(address);
    console.log(image);
    if(image === undefined || image == null){
      image = '../assets/imgs/anansi.png'
    }
    return image;
  }

}
