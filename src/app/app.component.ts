import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  GetOffer,
  RipOffFreelancers,
} from './states/recruitment/recruitment.actions';
import {
  ErrorAfterMutate,
  ErrorBeforeMutate,
  SetData,
} from './states/test/test.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.mutatingSameStateMultipleTimes();
    this.errorAfterMutatingState();
    this.errorBeforeMutatingState();
    this.dispatchTwoWithErrorBetween();

    this.store.dispatch([new GetOffer(), new RipOffFreelancers()]);
    this.store.dispatch(new GetOffer()).subscribe(() => {
      this.store.dispatch(new RipOffFreelancers());
    });
  }

  public mutatingSameStateMultipleTimes(): void {
    this.store.dispatch([
      new SetData('1'),
      new SetData('2'),
      new SetData('3'),
      new SetData('4'),
    ]);
  }

  public errorAfterMutatingState(): void {
    this.store.dispatch(new ErrorAfterMutate('Should change'));
  }

  public errorBeforeMutatingState(): void {
    this.store.dispatch(new ErrorBeforeMutate('Should not change!'));
  }

  public dispatchTwoWithErrorBetween(): void {
    this.store
      .dispatch([
        new ErrorBeforeMutate('Should not change!'),
        new SetData('Hello Did i change?'),
      ])
      .subscribe(
        (data) => {
          console.log(
            'Went in subscribe from method: dispatchTwoWithErrorBetween'
          );
        },
        (error) => {
          console.log('Went in Error from method: dispatchTwoWithErrorBetween');
        }
      );
  }
}
