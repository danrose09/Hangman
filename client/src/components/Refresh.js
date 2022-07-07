import React, { useEffect, useContext } from "react";
import { Store } from "../store";

const Refresh = () => {
  const { dispatch } = useContext(Store);

  useEffect(() => {
    dispatch({ type: "REFRESH" });
  }, []);

  return <div></div>;
};

export default Refresh;
