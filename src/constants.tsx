export interface CategorySavingModel {
  id: number;
  description: string;
  isDeleted: boolean;
  canPay: boolean;
  debt: boolean;
  weight: number;
  categoryGroupId: number;
}

export interface ExpenseModel {
  id: number;
  howMuch: number;
  date: Date;
  comment: string;
  attachment: string;
  /*ZlecenieStale - StandingOrder  */
  standingOrder: boolean;
  userId: number;
  categorySavingId: number;
  categoryExpenseId: number;
}

export interface ExpenseModelList {
  id: number;
  howMuch: number;
  date: Date;
  comment: string;
  attachment: string;
  /*ZlecenieStale - StandingOrder  */
  standingOrder: boolean;
  userId: number;
  categorySavingId: number;
  categoryExpenseId: number;
  categoryExpenseDescription: string;
  categorySavingDescription: string;
  userDescription: string;
}

export interface ExpenseModelProps {
  id: number;
  howMuch: number;
  date: Date;
  comment: string;
  attachment: string;
  /*ZlecenieStale - StandingOrder  */
  standingOrder: boolean;
  userId: number;
  categorySavingId: number;
  categoryExpenseId: number;
  categorySavingDescription: string;
  userDescription: string;
  showModal: boolean;
  handleCloseModal(showModal: boolean): void;
  handleSubmit(
    expenseAdd: ExpenseModel | React.FormEvent<HTMLFormElement>
  ): void;
}

export interface SavingModelList {
  id: string;
  categorySavingDescription: string;
  howMuch: number;
  date: Date;
  comment: string;
}
