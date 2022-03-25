import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ErrorAfterMutate, ErrorBeforeMutate, SetData } from './test.actions';

export class TestStateModel {
  data: string;
  cities: string[];
}

@State<TestStateModel>({
  name: 'test',
  defaults: {
    data: null,
    cities: ['Konstanz', 'Dresden', 'Zürich', 'Tokyo'],
  },
})
export class TestState {
  @Selector()
  static getData(state: TestStateModel) {
    return state.data;
  }

  @Action(SetData)
  setData({ patchState }: StateContext<TestStateModel>, { payload }: SetData) {
    patchState({
      data: payload,
    });
  }

  @Action(ErrorAfterMutate)
  errorAfterMutate(
    { patchState }: StateContext<TestStateModel>,
    { payload }: ErrorAfterMutate
  ) {
    patchState({
      data: payload,
    });
    throw new Error('ErrorAfterMutate');
  }

  @Action(ErrorBeforeMutate)
  errorBeforeMutate(
    { patchState }: StateContext<TestStateModel>,
    { payload }: ErrorBeforeMutate
  ) {
    throw new Error('ErrorBeforeMutate');
    patchState({
      data: payload,
    });
  }
}
