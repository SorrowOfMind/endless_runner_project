import { GameInterface } from "./../../models/types";
class Intro {
  private element: HTMLDivElement;
  private callback: () => void;
  private handler: (e: KeyboardEvent) => void;

  constructor(element: HTMLDivElement, callback: () => void) {
    this.element = element;
    this.callback = callback;
    this.handler = () => {};
    this.initListener();
  }

  private initListener() {
    this.handler = this.startGame.bind(this);
    document.addEventListener("keydown", this.handler);
  }

  private startGame(e: KeyboardEvent) {
    if (e.key === "Enter" && this.callback instanceof Function) {
      this.element.style.display = "none";
      this.callback();
      document.removeEventListener("keydown", this.handler);
    }
  }
}

export default Intro;
