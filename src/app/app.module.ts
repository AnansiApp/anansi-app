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
import { FamiliesServiceProvider } from '../providers/families-service/families-service';
import { QuestionsServiceProvider } from '../providers/questions-service/questions-service';
import { SugestionsPage} from '../pages/sugestions/sugestions';
import { ImageServiceProvider } from '../providers/image-service/image-service';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { DetailPageModule } from '../pages/detail/detail.module';
import { SugestionsPageModule } from '../pages/sugestions/sugestions.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    KeyPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DetailPageModule,
    SugestionsPageModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    KeyPage,
    SugestionsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FamiliesServiceProvider,
    QuestionsServiceProvider,
    ImageServiceProvider
  ]
})
export class AppModule {}
