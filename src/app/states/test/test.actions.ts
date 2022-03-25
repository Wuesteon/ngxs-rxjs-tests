export class SetData {
  static readonly type = '[Test] change test';

  constructor(public payload: string) {}
}

export class ErrorAfterMutate {
  static readonly type = '[Test] throw error after changing test';
  constructor(public payload: string) {}
}

export class ErrorBeforeMutate {
  static readonly type = '[Test] throw error before changing test';
  constructor(public payload: string) {}
}
