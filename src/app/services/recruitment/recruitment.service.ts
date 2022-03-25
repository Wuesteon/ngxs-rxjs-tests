import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Offer } from '../../models/recruitment.models';

@Injectable({
  providedIn: 'root',
})
export class RecruitmentService {
  public getActualOfferFromCMS(): Observable<Offer> {
    const offer: Offer = {
      currency: 'EUR',
      hourlyRate: 200,
      technologies: ['Cloud', 'Java'],
      description:
        'We are currently looking for a Cloud Architect to help us plan and implement our cloud environment.',
    };
    return of(offer).pipe(delay(1000));
  }
}
