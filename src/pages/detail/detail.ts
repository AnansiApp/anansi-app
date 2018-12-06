import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Family } from '../../models/family';
import { ImageServiceProvider } from '../../providers/image-service/image-service';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  public family: Family;
  private  images = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _imageService: ImageServiceProvider) {
    this.family = this.navParams.get('family');
    this.images = [];

    for(let address of this.family.imageAddresses){
      console.log(address);
      this.images.push(this._imageService.getImage(address));
    }
    if(this.images === undefined || this.images.length == 0){
      this.images.push('../assets/imgs/anansi.png');
    }

  }

  ionViewDidLoad() {
   
  }

}
