import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Specie } from '../../models/specie';
import { ImageServiceProvider } from '../../providers/image-service/image-service';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  public specie: Specie;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _imageService: ImageServiceProvider) {
    this.specie = this.navParams.get('specie');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  getSpecieImages(){
    console.log(this.specie);
    return this._imageService.getImage(this.specie.imageAddresses);
  }
}