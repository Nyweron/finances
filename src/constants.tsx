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
  id?: number;
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
  userDescription: string;
  categorySavingId: number;
  categorySavingDescription: string;
  categoryExpenseId: number;
  categoryExpenseDescription: string;
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

export interface IncomeModelList {
  id: number;
  howMuch: number;
  date: Date;
  comment: string;
  attachment: string;
  /*ZlecenieStale - StandingOrder  */
  standingOrder: boolean;
  userId: number;
  userDescription: string;
  categorySavingId: number;
  categorySavingDescription: string;
  categoryIncomeId: number;
  categoryIncomeDescription: string;
}

export interface IncomeModel {
  id: number;
  howMuch: number;
  date: Date;
  comment: string;
  attachment: string;
  /*ZlecenieStale - StandingOrder  */
  standingOrder: boolean | null;
  userId: number;
  categorySavingId: number;
  categoryIncomeId: number;
}

export interface CategorySavingModelList {
  id: number;
  description: string;
  isDeleted: boolean;
  canPay: boolean;
  debt: boolean;
  weight: number;
  categoryGroupId: number;
}

export interface CategoryIncomeModelList {
  id: number;
  description: string;
  isDeleted: boolean;
  weight: number;
  categoryGroupId: number;
}

export interface CategoryExpenseModelList {
  id: number;
  description: string;
  isDeleted: boolean;
  weight: number;
  categoryGroupId: number;
}

export interface AccountModel {
  email: string;
  password: string;
}

export interface AccountRefreshTokenModel {
  token: string;
  refreshToken: string;
}

export interface AccountContextModel {
  email: string;
  token: string;
  refreshToken: string;
  userName: string;
  someNumber: number;
  isLogin: boolean;
}

export type AccountContextType = {
  account: AccountContextModel;
  saveToken: (account: AccountContextModel) => void;
  logOff: () => void;
};
