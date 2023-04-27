import { GameInterface } from "../../../models/types";
import Animation from "../../animations/Animation";
import tool from "../../../utils/tool";
import UIObject from "./UIObject";

class GemScore extends UIObject {
  protected animation: Animation;
  protected image: CanvasImageSource;
  private readonly MAX_FRAMES = 5;
  private readonly MAX_FRAMES_SPEED = 20;
  private score: number;
  private ctx: CanvasRenderingContext2D;

  constructor(
    game: GameInterface,
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D
  ) {
    super(game, x, y, 40, 35);

    this.score = 0;
    this.ctx = ctx;
    this.image = tool.qs("#cherry") as CanvasImageSource;
    this.animation = new Animation(
      this.image,
      this.width,
      this.height,
      0,
      0,
      this.MAX_FRAMES,
      this.MAX_FRAMES_SPEED
    );
  }

  override draw(ctx: CanvasRenderingContext2D): void {
    this.animation.drawFrame(ctx, this.x, this.y);

    ctx.font = "40px Comic Sans MS";
    ctx.fillStyle = "black";

    ctx.fillText(this.score.toString(), this.x + 60, this.y + 30);
  }

  private drawNumber() {
    this.ctx.font = "40px Comic Sans MS";
    this.ctx.fillStyle = "#bc5ccc";

    this.ctx.fillText(this.score.toString(), this.x + 60, this.y + 30);
  }

  update(n: number) {
    this.score = n;
    this.drawNumber();
    this.animation.loopFrame();
  }
}

export default GemScore;
