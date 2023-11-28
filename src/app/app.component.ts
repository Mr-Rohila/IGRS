import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './services/local-storage.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IGRS';
  supportedLanguage = ['en', 'hi'];

  public showNavbar: boolean = false;
  public static showNavbarEvent: Subject<boolean> = new Subject();

  constructor(private translateService: TranslateService, private _localStorage: LocalStorageService) {
    this.translateService.addLangs(this.supportedLanguage);
    this.translateService.setDefaultLang('en');
    //get user default language
    var userLang = _localStorage.getDefaultLanguage();
    if (userLang == undefined) {
      _localStorage.setDefaultLanguage("en");
      userLang = 'en';
    }
    this.translateService.use(userLang);

    AppComponent.showNavbarEvent.subscribe((event) => {
      this.showNavbar = event;
    });
  }

}
