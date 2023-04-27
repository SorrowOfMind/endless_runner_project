import { getNiceTimeString, timeConverter } from "../../utils/timeConverter";

class GameOver {
  private element: HTMLElement;
  private handler: (e: KeyboardEvent) => void;
  private callback: () => void;
  constructor(callback: () => void, score: number, time: number) {
    let _elem = document.getElementById("gameover");
    if (_elem === null) throw new Error("Failed to find gameover element");
    _elem.classList.remove("hide");
    this.element = _elem;
    this.initListener();
    this.handler = () => {};
    this.callback = callback;

    let _score = document.getElementById("score");
    if (_score) _score.textContent = `Score: ${score}`;
    let _time = document.getElementById("time");
    if (_time)
      _time.textContent = `You ran for: ${getNiceTimeString(
        timeConverter(time)
      )}`;
  }
  private initListener() {
    this.handler = this.awaitKeyPress.bind(this);
    document.addEventListener("keydown", this.handler);
  }

  private awaitKeyPress(e: KeyboardEvent) {
    if (e.key === "Enter") {
      document.removeEventListener("keydown", this.handler);
      this.startGame();
    }
  }
  private startGame() {
    this.element.classList.add("hide");

    this.callback();
  }
}

export default GameOver;
