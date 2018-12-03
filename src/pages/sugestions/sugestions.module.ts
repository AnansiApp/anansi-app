import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SugestionsPage } from './sugestions';

@NgModule({
  declarations: [
    SugestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SugestionsPage),
  ],
})
export class SugestionsPageModule {}
