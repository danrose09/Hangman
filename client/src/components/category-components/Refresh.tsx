import { useEffect, useContext } from "react";
import { Store } from "../../react-store/store";

const Refresh = () => {
  const { dispatch } = useContext(Store);

  useEffect(() => {
    const refresh = () => {
      dispatch({ type: "REFRESH" });
    };

    refresh();
  }, [dispatch]);

  return <div></div>;
};

export default Refresh;
