import * as React from "react";
import { AccountContextModel, AccountContextType } from "../constants";

export const AccountContext = React.createContext<AccountContextType | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

const AccountProvider: React.FC<Props> = ({ children }) => {
  const [account, setAccount] = React.useState<AccountContextModel>({
    email: "emailAccountProvider@test.com",
    userName: "Paul",
    token: "324243fsdfd@#$",
    someNumber: 20,
  });

  const saveToken = (account: AccountContextModel) => {
    const newAccount: AccountContextModel = {
      email: account.email,
      someNumber: account.someNumber,
      token: account.token,
      userName: account.userName,
    };
    setAccount(newAccount);
  };

  return (
    <AccountContext.Provider value={{ account, saveToken }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
