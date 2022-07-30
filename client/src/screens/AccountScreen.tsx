import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";

const AccountScreen = () => {
  const navigate = useNavigate();
  const { dispatch, state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);
  return <div>AccountScreen</div>;
};

export default AccountScreen;
