import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http'
import { Family } from '../../models/family';
import { FamiliesServiceProvider } from '../../providers/families-service/families-service';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycle';
import { DetailPage } from '../detail/detail';
import { ImageServiceProvider } from '../../providers/image-service/image-service';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage implements NavLifecycles {

  public families: Family[];

  constructor(public navCtrl: NavController, 
    private _loadingCtrl: LoadingController,
    private _familiesService: FamiliesServiceProvider,
    private _imageService: ImageServiceProvider,
    private _alertCtrl: AlertController) {}

  ionViewDidLoad() {
      this.loadFamilies();
  }

  getFamilies(ev: any){
    let loading = this._loadingCtrl.create({
      content: "Carregando..."
    });
    const filter = ev.target.value;
    if(filter){
      this._familiesService.getByName(filter)
      .subscribe(
        (families) => {
          this.families = families;
          loading.dismiss();
        },
      ); 
    }else{
      this.loadFamilies();
    }
    }

    loadFamilies(filter?){
      let loading = this._loadingCtrl.create({
        content: "Carregando..."
      });
  
      loading.present();
  
      this._familiesService.listFamilies()
      .subscribe(
        (families) => {
          this.families = families;
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
