import GameObject from "../GameObject";
import { GameInterface } from "../../../models/types";
import Animation from "../../animations/Animation";
import tool from "../../../utils/tool";
import { getNiceTimeString, timeConverter } from "../../../utils/timeConverter";
import UIObject from "./UIObject";

class Timer extends UIObject {
  public timeString: string = "00:00:00";

  private ctx: CanvasRenderingContext2D;

  constructor(
    game: GameInterface,
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D
  ) {
    super(game, x, y, 40, 35);

    this.ctx = ctx;
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
    const time = timeConverter(n);
    this.timeString = getNiceTimeString(time);
    this.drawNumber();
  }
}

export default Timer;
