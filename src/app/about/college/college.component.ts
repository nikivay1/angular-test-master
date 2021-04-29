import {Component, Inject, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {finalize} from 'rxjs/operators';
import {COLLEGE_ABOUT$} from '../about.providers';
import {Observable} from 'rxjs';
import {AboutInterface} from '../about.interface';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-college',
    templateUrl: './college.component.html',
    styleUrls: ['./college.component.scss']
})
export class CollegeComponent implements OnInit {
    college?: AboutInterface;
    isLoading = true;    
    selectedLanguage: string;    
    languages: {id: string, title: string}[] = [];

    constructor(
        @Inject(COLLEGE_ABOUT$) readonly college$: Observable<AboutInterface>,
        private translateService: TranslateService
    ) {        
    }

    ngOnInit() {
        this.getCollege();
        this.translateService.use(environment.defaultLocale);

        this.selectedLanguage = environment.defaultLocale;
        this.translateService.get(environment.locales.map(x => `LANGUAGES.${x.toUpperCase()}`))
            .subscribe(translations => {
                this.languages = environment.locales.map(x => {
                    return {
                        id: x,
                        title: translations[`LANGUAGES.${x.toUpperCase()}`],
                    };
                });
            });
    }


    getCollege(): void {        
        this.college$.subscribe(college => {
            this.college = college;
        });
    }

    changeLocale() {
        this.translateService.use(this.selectedLanguage);
    }
}
