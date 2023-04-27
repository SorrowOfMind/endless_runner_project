import Game from "./Game";
import { Intro } from "./components";
import GameOver from "./components/layout/GameOver";
import "./style.css";
import tool from "./utils/tool";

const theGame = () => {
  let game: Game | null;

  const restartGame = () => {
    game?.resetGame();
    game?.loop(0);
  };

  const gameOverCallback = (score: number, time: number) => {
    const gameOver = new GameOver(restartGame, score, time);
  };

  game = new Game(
    tool.id("cvs") as HTMLCanvasElement,
    1000,
    600,
    (score: number, time: number) => gameOverCallback(score, time)
  );
  const intro = new Intro(tool.id("intro") as HTMLDivElement, () =>
    game?.loop(0)
  );
};

window.addEventListener("load", theGame);
