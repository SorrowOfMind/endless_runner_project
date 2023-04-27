import Game from "../../Game";
import tool from "../../utils/tool";

class GameOver {
  private element: HTMLElement;
  private handler: (e: KeyboardEvent) => void;
  private callback: () => void;
  constructor(callback: () => void) {
    let _elem = document.getElementById("gameover");
    if (_elem === null) throw new Error("Failed to find gameover element");
    _elem.classList.remove("hide");
    this.element = _elem;
    this.initListener();
    this.handler = () => {};
    this.callback = callback;
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
