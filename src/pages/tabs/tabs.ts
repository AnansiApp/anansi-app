import { Component } from '@angular/core';

import { KeyPage } from '../key/key';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = KeyPage;
  tab3Root = SearchPage;

  constructor() {

  }
}
