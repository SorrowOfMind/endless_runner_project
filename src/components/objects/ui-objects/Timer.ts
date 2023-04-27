import GameObject from "../GameObject";
import { GameInterface } from "../../../models/types";
import Animation from "../../animations/Animation";
import tool from "../../../utils/tool";

class Timer extends GameObject {
  public timeString: string = "00:00:00";

  protected velX: number;
  protected velY: number;
  protected animation: Animation;
  protected image: CanvasImageSource;

  private readonly MAX_FRAMES = 5;
  private readonly MAX_FRAMES_SPEED = 20;
  private ctx: CanvasRenderingContext2D;

  constructor(
    game: GameInterface,
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D
  ) {
    super(game, x, y, 40, 35);
    this.velX = 0;
    this.velY = 0;

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
    ctx.font = "40px Comic Sans MS";
    ctx.fillStyle = "#bc5ccc";

    ctx.fillText(this.timeString.toString(), this.x, this.y);
  }

  private drawNumber() {
    this.ctx.font = "40px Comic Sans MS";
    this.ctx.fillStyle = "#bc5ccc";

    this.ctx.fillText(this.timeString.toString(), this.x, this.y);
  }

  update(n: number) {
    this.x -= this.velX;
    const hours = Math.floor(n / (1000 * 60 * 60));
    const minutes = Math.floor((n - hours * 3600 * 1000) / (1000 * 60));
    const seconds = Math.floor((n - minutes * 60 * 1000) / 1000);

    this.timeString = `${hours > 9 ? hours : "0" + hours}:${
      minutes > 9 ? minutes : "0" + minutes
    }:${seconds > 9 ? seconds : "0" + seconds}`;
    this.drawNumber();
    this.animation.loopFrame();
  }
}

export default Timer;
