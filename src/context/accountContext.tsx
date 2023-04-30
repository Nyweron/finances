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
    email: "",
    userName: "",
    token: "",
    someNumber: -1,
    isLogin: false,
  });

  const saveToken = (account: AccountContextModel) => {
    const newAccount: AccountContextModel = {
      email: account.email,
      someNumber: account.someNumber,
      token: account.token,
      userName: account.userName,
      isLogin: account.isLogin,
    };
    setAccount(newAccount);
  };

  const logOff = () => {
    const clearAccount: AccountContextModel = {
      email: "",
      someNumber: -1,
      token: "",
      userName: "",
      isLogin: false,
    };

    setAccount(clearAccount);
    localStorage.removeItem("Authorization");
  };

  return (
    <AccountContext.Provider value={{ account, saveToken, logOff }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
