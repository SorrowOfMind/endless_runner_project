import { Player, Background, InputHandler } from "./components";
import ObjectsHandler from "./components/handlers/ObjectsHandler";
import GameOver from "./components/layout/GameOver";
import GemScore from "./components/objects/ui-objects/GemScore";
import Timer from "./components/objects/ui-objects/Timer";
import {
  ObjectsHandlerInterface,
  GameInterface,
  PlayerInterface,
} from "./models/types";
import tool from "./utils/tool";

class Game implements GameInterface {
  public isRunning: boolean;
  public width: number;
  public height: number;
  public speed: number;
  public background: Background;
  public player: Player;
  public inputHandler: InputHandler;
  public objectsHandler: ObjectsHandlerInterface;
  public keys: string[];

  readonly GRAVITY: number = 0.5;
  readonly GROUND_HEIGHT: number = 130;
  readonly AIR_RESISTANCE: number = 0.9;

  private cvs: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D | null;
  private gameOver: boolean;
  private raf: number | null;
  private accumulatedTime: number;
  private timeStep: number;
  private gemScore: GemScore | null = null;
  private timer: Timer | null = null;
  public gemsCollected: number;
  private gameOverCallback: (score: number, time: number) => void;

  constructor(
    canvasElement: HTMLCanvasElement,
    width: number,
    height: number,
    gameOverCallback: (score: number, time: number) => void
  ) {
    this.cvs = canvasElement;
    this.width = width;
    this.height = height;
    this._ctx = null;
    this.gameOver = false;
    this.raf = null;
    this.accumulatedTime = window.performance.now();
    this.timeStep = 1000 / 200;
    this.speed = 2.5;
    this.keys = [];
    this.isRunning = false;
    this.gemsCollected = 0;
    this.gameOverCallback = gameOverCallback;

    this.background = new Background(this, [
      tool.id("bg1"),
      tool.id("bg2"),
      tool.id("bg3"),
    ] as HTMLImageElement[]);
    this.player = new Player(this, 100, 315);
    console.log("is this even getting called");
    this.inputHandler = new InputHandler(this);
    this.objectsHandler = new ObjectsHandler(this);

    this.initCanvas();
  }

  public gameOverProcedure() {
    this.gameOver = true;
    this.ctx?.clearRect(0, 0, this.width, this.height);
    this.gameOverCallback(this.gemsCollected, this.accumulatedTime);
  }

  public loop(timestamp: DOMHighResTimeStamp) {
    if (this.gameOver) {
      cancelAnimationFrame(this.raf as number);
      return;
    }

    if (timestamp >= this.accumulatedTime + this.timeStep) {
      if (timestamp - this.accumulatedTime >= this.timeStep * 2) {
        this.accumulatedTime = timestamp;
      }
    }
    this.draw(this._ctx as CanvasRenderingContext2D);

    this.accumulatedTime += this.timeStep;
    this.update();

    this.raf = requestAnimationFrame(this.loop.bind(this));
  }

  private initCanvas() {
    this._ctx = this.cvs.getContext("2d");

    if (!this._ctx || !(this._ctx instanceof CanvasRenderingContext2D)) {
      throw new Error("No 2D context available");
    }
    this.gemScore = new GemScore(this, 15, 15, this.ctx!);
    this.timer = new Timer(this, 800, 45, this.ctx!);
    this.cvs.width = this.width;
    this.cvs.height = this.height;
  }

  private draw(ctx: CanvasRenderingContext2D) {
    this.background.draw(ctx);
    this.player.draw(ctx);
    this.gemScore?.draw(ctx);
    this.objectsHandler.draw(ctx);
    this.timer?.draw(ctx);
  }

  private update() {
    this.background.update();
    this.player.update();
    this.gemScore?.update(this.gemsCollected);
    this.objectsHandler.spawn();
    this.objectsHandler.update();
    this.timer?.update(this.accumulatedTime);
  }

  get ctx() {
    return this._ctx;
  }
}

export default Game;
