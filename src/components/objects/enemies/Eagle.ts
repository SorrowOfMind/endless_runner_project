import GameObject from "../GameObject";
import { GameInterface, EnemyInterface } from "../../../models/types";
import Animation from "../../animations/Animation";
import tool from "../../../utils/tool";

class Eagle extends GameObject implements EnemyInterface {
  public markedForDeath: boolean;

  protected velX: number;
  protected velY: number;
  protected animation: Animation;
  protected image: CanvasImageSource;

  private minY: number;
  private readonly MAX_FRAMES = 4;
  private readonly MAX_FRAMES_SPEED = 10;
  private readonly TRAJECTORY = 11.0418223845137;

  constructor(game: GameInterface, x: number, y: number, velX: number) {
    super(game, x, y, 90, 101);
    this.velX = velX * this.game.speed;
    this.velY = -Math.sin(this.TRAJECTORY) * 3;
    this.minY =
      this.game.height - this.game.GROUND_HEIGHT - this.game.player.height + 15;
    this.markedForDeath = false;
    this.image = tool.id("eagle") as CanvasImageSource;
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

  update() {
    if (this.y + this.height > this.minY) {
      this.velY = Math.sin(this.TRAJECTORY) * 3;
    }

    this.x -= this.velX;
    this.y += this.velY;

    if (this.x + this.width < 0) {
      this.markedForDeath = true;
      return;
    }
    this.animation.loopFrame();
  }
}

export default Eagle;
