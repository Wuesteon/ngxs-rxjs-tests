import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Freelancer, Offer } from '../../models/recruitment.models';
import { RecruitmentService } from '../../services/recruitment/recruitment.service';
import { GetOffer, RipOffFreelancers } from './recruitment.actions';
export class RecruitmentStateModel {
  actualOffer: Offer;
  rippedOfFreelancer: Freelancer[];
  freelancer: Freelancer[];
}

@State<RecruitmentStateModel>({
  name: 'recruitment',
  defaults: {
    actualOffer: null,
    rippedOfFreelancer: [],
    freelancer: [
      {
        id: 1,
        name: 'Olaf Meier',
        technologies: ['Java', 'Springboot', 'SQL', 'NoSQl'],
      },
      {
        id: 2,
        name: 'Jörg Errikson',
        technologies: ['JavaScript', 'Springboot', 'Angular', 'firebase'],
      },
    ],
  },
})
@Injectable()
export class RecruitmentState {
  @Selector()
  static getData(state: RecruitmentStateModel) {
    return state.actualOffer;
  }

  constructor(private recruitmentService: RecruitmentService) {}

  @Action(GetOffer)
  getOffer(ctx: StateContext<RecruitmentStateModel>): Observable<GetOffer> {
    return this.recruitmentService.getActualOfferFromCMS().pipe(
      tap((offer: Offer) => {
        ctx.patchState({ actualOffer: offer });
      })
    );
  }

  @Action(RipOffFreelancers)
  ripOffFreelancers(ctx: StateContext<RecruitmentStateModel>) {
    console.log(ctx);
    const state = ctx.getState();
    const offer = state.actualOffer;
    const rippedOfFreelancer = [];
    state.freelancer.forEach((freelancer) => {
      const filteredArray = freelancer.technologies.filter((value) =>
        offer.technologies.includes(value)
      );
      console.log(filteredArray);
      // We got a match he has atleast one technology in common ;)
      if (filteredArray.length > 0) {
        console.log(
          `Hello ${
            freelancer.name
          }, we got an interesting offer from a Company, you need minimum 20years experience in following technologies ${offer.technologies.join(
            ', '
          )}. The all in rate is ${offer.hourlyRate * 0.5} ${offer.currency}.`
        );
        rippedOfFreelancer.push(freelancer);
      }
    });
    ctx.patchState({ rippedOfFreelancer });
  }
}
