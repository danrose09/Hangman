import { useContext, useEffect } from "react";
import { Store } from "../../react-store/store";

const Attempts = () => {
  const { dispatch, state } = useContext(Store);
  const { maxAttempts, remainingAttempts, difficulty, hasLost } = state;

  useEffect(() => {
    if (difficulty === "easy") {
      dispatch({ type: "SET_MAX_ATTEMPTS", payload: 15 });
      dispatch({ type: "ATTEMPT_COUNTER", payload: 15 });
    } else if (difficulty === "normal") {
      dispatch({ type: "SET_MAX_ATTEMPTS", payload: 10 });
      dispatch({ type: "ATTEMPT_COUNTER", payload: 10 });
    } else if (difficulty === "hard") {
      dispatch({ type: "SET_MAX_ATTEMPTS", payload: 7 });
      dispatch({ type: "ATTEMPT_COUNTER", payload: 7 });
    } else if (difficulty === "genius") {
      dispatch({ type: "SET_MAX_ATTEMPTS", payload: 5 });
      dispatch({ type: "ATTEMPT_COUNTER", payload: 5 });
    }
  }, [difficulty, dispatch]);

  return (
    <div>
      <p hidden={hasLost}>
        Remaining Attemps: {`${remainingAttempts}/${maxAttempts}`}
      </p>
    </div>
  );
};

export default Attempts;
