import { ObjectInterface, GameInterface } from "../../../models/types";

abstract class UIObject implements ObjectInterface {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  protected game: GameInterface;

  constructor(
    game: GameInterface,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D) {}

  abstract update(timestamp?: number): void;
}

export default UIObject;
