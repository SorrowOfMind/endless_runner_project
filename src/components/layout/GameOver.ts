class GameOver {
  private element: HTMLDivElement;
  private callback: () => void;
  private handler: (e: KeyboardEvent) => void;

  constructor(element: HTMLDivElement, callback: () => void) {
    this.element = element;
    this.callback = callback;
    this.handler = () => {};
  }
}

export default GameOver;
