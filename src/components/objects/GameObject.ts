import { GameInterface, ObjectInterface } from "../../models/types";
import Animation from "../animations/Animation";

abstract class GameObject implements ObjectInterface {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  protected abstract animation: Animation;
  protected abstract image: CanvasImageSource;
  protected abstract velY: number;
  protected abstract velX: number;
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

  draw(ctx: CanvasRenderingContext2D) {
    this.animation.drawFrame(ctx, this.x, this.y);
  }

  abstract update(timestamp?: number): void;
}

export default GameObject;
