import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { CollegeComponent } from './college/college.component';
import { COLLEGE_ABOUT$ } from './about.providers';
import { of } from 'rxjs';
import { AboutInterface } from './about.interface';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
    return new TranslateHttpLoader(http, './assets/locale/', '.json');
} 

export const defaultInterface: AboutInterface = {
    id: 1,
    name: "first",
    photo: "link",
    about: "about", 
    media_type: 0,
    vimeo_video_id: 23
}

@NgModule({
    declarations: [
        CollegeComponent
    ],
    imports: [
        CommonModule, 
        AboutRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            defaultLanguage: environment.defaultLocale,
        }),        
        FormsModule
    ],
    providers: [
        { provide: COLLEGE_ABOUT$, useFactory: () => {
            return of(defaultInterface)
        } }
    ]
})
export class AboutModule {
}
