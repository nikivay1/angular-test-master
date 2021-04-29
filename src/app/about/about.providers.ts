import {InjectionToken} from '@angular/core';
import { Observable } from 'rxjs';
import { AboutInterface } from './about.interface';

export const COLLEGE_ABOUT$ = new InjectionToken<Observable<AboutInterface>>('About college');
