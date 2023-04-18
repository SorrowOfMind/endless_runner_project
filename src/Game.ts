import { Player, Background, Controller } from "./components";
import EnemiesManager from "./components/handlers/EnemiesManager";
import { EnemyManagerInterface, GameInterface, PlayerInterface } from "./models/types";
import tool from "./utils/tool";

class Game implements GameInterface {
    public ctx: CanvasRenderingContext2D | null;
    public width: number;
    public height: number;
    public speed: number;
    public background: Background;
    public player: PlayerInterface;
    public controller: Controller;
    public enemiesManager: EnemyManagerInterface;
    public keys: string[];

    readonly GRAVITY: number = 0.5;
    readonly GROUND_HEIGHT: number = 130;
    readonly AIR_RESISTANCE: number = 0.9;

    private cvs: HTMLCanvasElement;
    private gameOver: boolean;
    private raf: number | null;
    private accumulatedTime: number;
    private timeStep: number;

    constructor(canvasElement: HTMLCanvasElement, width: number, height: number) {
        this.cvs = canvasElement;
        this.width = width;
        this.height = height;
        this.ctx = null;
        this.gameOver = false;
        this.raf = null;
        this.accumulatedTime = window.performance.now()
        this.timeStep = 1000 / 200;
        this.speed = 2.5;
        this.keys = [];

        this.background = new Background(this, ([tool.id("bg1"), tool.id("bg2"), tool.id("bg3")] as HTMLImageElement[]));
        this.player = new Player(this, tool.id("player") as HTMLImageElement);
        this.controller = new Controller(this);
        this.enemiesManager = new EnemiesManager(this);

        this.initCanvas();
    }

    private initCanvas() {
        this.ctx = this.cvs.getContext('2d');

        if (!this.ctx || !(this.ctx instanceof CanvasRenderingContext2D)) {
            throw new Error('No 2D context available');
        }

        this.cvs.width = this.width;
        this.cvs.height = this.height;
    }

    private draw(ctx: CanvasRenderingContext2D) {
        this.background.draw(ctx);
        this.player.draw(ctx);
        this.enemiesManager.draw(ctx);
    }

    private update() {
        this.background.update();
        this.player.update();

        this.enemiesManager.spawn();
        this.enemiesManager.update();
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

            this.draw(this.ctx as CanvasRenderingContext2D);

            // while (this.accumulatedTime < timestamp) {
                // this.accumulatedTime += this.timeStep;
                this.update();
            //     }
            // }

        this.raf = requestAnimationFrame(this.loop.bind(this));
    }
}

export default Game;