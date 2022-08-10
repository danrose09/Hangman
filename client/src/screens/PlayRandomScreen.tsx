import RandomWord from "../components/RandomWord";
import LetterBank from "../components/LetterBank";
import Refresh from "../components/Refresh";

const PlayRandomScreen = () => {
  return (
    <div className="play-random-screen">
      <h1>Hangman</h1>
      <RandomWord />
      <LetterBank />
      <Refresh />
    </div>
  );
};

export default PlayRandomScreen;
