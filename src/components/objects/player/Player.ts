import GameObject from "../GameObject";
import { GameInterface, PlayerInterface } from "../../../models/types";
import Animation from "../../animations/Animation";
import tool from "../../../utils/tool";

class Player extends GameObject implements PlayerInterface {
  public cherries: number;
  public dead: boolean;
  public isDucking: boolean;

  protected velX: number;
  protected velY: number;
  protected animation: Animation;
  protected image: CanvasImageSource;

  private isJumping: boolean;
  private isFalling: boolean;
  private isRunning: boolean;
  private prevYVel: number;
  private jumpCount: number;
  private maxFrameSpeed: number;

  private readonly SPRITE_MAX_FRAMES = [6, 2, 2, 2];
  private readonly DUCK_HEIGHT = 56;
  private readonly DUCK_OFFSET = 19;
  /**
   * 0 - RUN
   * 1 - JUMP
   * 2 - DEATH
   * 3 - DUCK
   */

  constructor(game: GameInterface, x: number, y: number) {
    super(game, x, y, 75, 75);
    this.image = tool.id("player") as CanvasImageSource;
    this.velY = 0;
    this.velX = 0;
    this.prevYVel = 0;
    this.isJumping = false;
    this.isFalling = false;
    this.isDucking = false;
    this.jumpCount = 0;
    this.maxFrameSpeed = 30;
    this.cherries = 0;
    this.dead = false;

    this.animation = new Animation(
      this.image,
      this.width,
      this.height,
      0,
      0,
      6,
      this.maxFrameSpeed / this.game.speed
    );
    this.isRunning = true;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.isDucking) {
      this.animation.drawIrregularFrame(
        ctx,
        this.x,
        this.y,
        this.width,
        this.DUCK_HEIGHT,
        this.DUCK_OFFSET
      );
      return;
    }
    this.animation.drawFrame(ctx, this.x, this.y);
  }

  update() {
    if (this.game.keys.includes("up") && !this.isJumping && !this.isDucking) {
      this.velY -= 32;
      this.isJumping = true;
      this.animation.switchAnimation(1, this.SPRITE_MAX_FRAMES[1], 38);
      this.isRunning = false;
      this.jumpCount++;
    }

    //checking if the player is falling from a jump
    if (!this.game.keys.includes("up") && this.velY + this.prevYVel > 0) {
      this.isFalling = true;
    }
    this.prevYVel = this.velY;

    //perform double jump
    if (
      this.game.keys.includes("up") &&
      this.isJumping &&
      this.isFalling &&
      this.jumpCount === 1
    ) {
      this.velY -= 32;
      this.animation.switchAnimation(1, this.SPRITE_MAX_FRAMES[1], 38);
      this.isRunning = false;
      this.isFalling = false;
      this.jumpCount = 0;
    }

    this.velY += this.game.GRAVITY;
    this.y += this.velY;
    this.velY *= this.game.AIR_RESISTANCE;

    if (this.y > this.game.height - this.game.GROUND_HEIGHT - this.height) {
      this.y = this.game.height - this.game.GROUND_HEIGHT - this.height;
      this.velY = 0;
      this.isJumping = false;
      this.isFalling = false;
      this.jumpCount = 0;
    }

    if (this.game.keys.length === 0 && !this.isJumping) {
      this.isDucking = false;
      if (!this.isRunning) {
        this.animation.switchAnimation(
          0,
          this.SPRITE_MAX_FRAMES[0],
          this.maxFrameSpeed / this.game.speed
        );
        this.isRunning = true;
      }
    }

    if (this.game.keys.includes("down") && !this.isJumping) {
      if (!this.isDucking) {
        this.y += this.DUCK_OFFSET;
        this.animation.switchAnimation(
          3,
          this.SPRITE_MAX_FRAMES[3],
          this.maxFrameSpeed / this.game.speed
        );
        this.isDucking = true;
      }
      this.isRunning = false;
    }

    this.animation.loopFrame();
  }
}

export default Player;
