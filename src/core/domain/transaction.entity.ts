export class Transaction {
    constructor(
      public readonly id: number,
      public readonly amount: number,
      public readonly type: string,
      public readonly date: Date,
    ) {}
  }
  