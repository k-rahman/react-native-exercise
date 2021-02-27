import React, { useContext } from "react";

import AuthContext from "../auth/context";
import LoggedInStack from "../navigation/LoggedInStack";
import LoggedOutStack from "../navigation/LoggedOutStack";

const AccountNav = () => {
  const { user } = useContext(AuthContext);

  return <>{user ? <LoggedInStack /> : <LoggedOutStack />}</>;
};

export default AccountNav;
