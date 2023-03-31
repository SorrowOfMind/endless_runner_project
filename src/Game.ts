import Player from "./characters/Player";
import Background from "./layout/Background";
import { GameInterface } from "./models/interfaces";
import tool from "./utils/tool";

class Game implements GameInterface {
    private cvs: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D | null;
    public width: number;
    public height: number;
    private gameOver: boolean;
    private lastTime: number;
    public speed: number;

    public background: Background;

    constructor(canvasElement: HTMLCanvasElement, width: number, height: number) {
        this.cvs = canvasElement;
        this.width = width;
        this.height = height;
        this._ctx = null;
        this.gameOver = false;
        this.lastTime = 0;
        this.speed = 1; //just or test!!

        this.background = new Background(this, ([tool.id("bg1"), tool.id("bg2"), tool.id("bg3")] as HTMLImageElement[]))

        this.initCanvas();
    }

    private initCanvas() {
        this._ctx = this.cvs.getContext('2d');

        if (!this._ctx || !(this._ctx instanceof CanvasRenderingContext2D)) {
            throw new Error('No 2D context available');
        }

        this.cvs.width = this.width;
        this.cvs.height = this.height;
    }

    get ctx() {
        return this._ctx;
    }

    private draw(ctx: CanvasRenderingContext2D) {
        this.background.draw(ctx);
    }

    private update(deltaTime: number) {
        this.background.update();
    }
   

    public loop(timestamp: DOMHighResTimeStamp) {
        if (this.gameOver) {
            return;
        }

        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.draw(this.ctx as CanvasRenderingContext2D);
        this.update(deltaTime);

        requestAnimationFrame(this.loop.bind(this));
    }
}

export default Game;