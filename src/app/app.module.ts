import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { KeyPage } from '../pages/key/key';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { SpeciesServiceProvider } from '../providers/species-service/species-service';
import { QuestionsServiceProvider } from '../providers/questions-service/questions-service';
import { DetailPage } from '../pages/detail/detail';
import { SugestionsPage} from '../pages/sugestions/sugestions';
import { ImageServiceProvider } from '../providers/image-service/image-service';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    KeyPage,
    DetailPage,
    SugestionsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    KeyPage,
    DetailPage,
    SugestionsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpeciesServiceProvider,
    QuestionsServiceProvider,
    ImageServiceProvider
  ]
})
export class AppModule {}
