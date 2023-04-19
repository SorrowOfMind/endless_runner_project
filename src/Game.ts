import { Player, Background, InputHandler } from "./components";
import ObjectsHandler from "./components/handlers/ObjectsHandler";
import { ObjectsHandlerInterface, GameInterface, PlayerInterface } from "./models/types";
import tool from "./utils/tool";

class Game implements GameInterface {
    public isRunning: boolean;
    public width: number;
    public height: number;
    public speed: number;
    public background: Background;
    public player: PlayerInterface;
    public inputHandler: InputHandler;
    public objectsHandler: ObjectsHandlerInterface;
    public keys: string[];

    readonly GRAVITY: number = 0.5;
    readonly GROUND_HEIGHT: number = 130;
    readonly AIR_RESISTANCE: number = 0.9;

    private cvs: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D | null
    private gameOver: boolean;
    private raf: number | null;
    private accumulatedTime: number;
    private timeStep: number;

    constructor(canvasElement: HTMLCanvasElement, width: number, height: number) {
        this.cvs = canvasElement;
        this.width = width;
        this.height = height;
        this._ctx = null;
        this.gameOver = false;
        this.raf = null;
        this.accumulatedTime = window.performance.now()
        this.timeStep = 1000 / 200;
        this.speed = 2.5;
        this.keys = [];
        this.isRunning = false;

        this.background = new Background(this, ([tool.id("bg1"), tool.id("bg2"), tool.id("bg3")] as HTMLImageElement[]));
        this.player = new Player(this, 100, 315);
        this.inputHandler = new InputHandler(this);
        this.objectsHandler = new ObjectsHandler(this);

        this.initCanvas();
    }

    public loop(timestamp: DOMHighResTimeStamp) {
        if (this.gameOver) {
            cancelAnimationFrame(this.raf as number);
            return;
        }

        // if (timestamp >= this.accumulatedTime + this.timeStep) {
        //     if (timestamp - this.accumulatedTime >= this.timeStep * 2) {
        //         this.accumulatedTime = timestamp;
        //     }

            this.draw(this._ctx as CanvasRenderingContext2D);

            // while (this.accumulatedTime < timestamp) {
                // this.accumulatedTime += this.timeStep;
                this.update();
            //     }
            // }

        this.raf = requestAnimationFrame(this.loop.bind(this));
    }

    private initCanvas() {
        this._ctx = this.cvs.getContext('2d');

        if (!this._ctx || !(this._ctx instanceof CanvasRenderingContext2D)) {
            throw new Error('No 2D context available');
        }

        this.cvs.width = this.width;
        this.cvs.height = this.height;
    }

    private draw(ctx: CanvasRenderingContext2D) {
        this.background.draw(ctx);
        this.player.draw(ctx);
        this.objectsHandler.draw(ctx);
    }

    private update() {
        this.background.update();
        this.player.update();

        this.objectsHandler.spawn();
        this.objectsHandler.update();
    }
   
    get ctx() {
        return this._ctx;
    }
   
}

export default Game;