import Game from "./Game";
import { Intro } from "./components";
import GameOver from "./components/layout/GameOver";
import "./style.css";
import tool from "./utils/tool";

const theGame = (first: boolean) => {
  let game: Game | null;
  function createNewGame() {
    game = new Game(
      tool.id("cvs") as HTMLCanvasElement,
      1000,
      600,
      gameOverCallback
    );
  }

  const gameOverCallback = (score: number, time: number) => {
    game = null;
    console.log(game);
    createNewGame();
    console.log(game);
    const gameOver = new GameOver(() => game?.loop(0), score, time);
  };

  if (first) {
    game = new Game(
      tool.id("cvs") as HTMLCanvasElement,
      1000,
      600,
      (score: number, time: number) => gameOverCallback(score, time)
    );
    const intro = new Intro(tool.id("intro") as HTMLDivElement, () =>
      game?.loop(0)
    );
  }
};

window.addEventListener("load", () => theGame(true));
