import Enemy from "./Enemy";
import { GameInterface, EnemyInterface } from "../../models/types";
import Animation from "../animations/Animation";
import tool from "../../utils/tool";

class Eagle extends Enemy implements EnemyInterface {
    
    private image: CanvasImageSource;
    private velX: number;
    private velY: number;
    private minY: number;
    private trajectory: number;

    private eagleAnimation: Animation;
    private readonly maxFrames = 4;
    private readonly maxFrameSpeed = 10;

    constructor(game: GameInterface, x: number, y: number, velX: number) {
        super(game, x, y, 90, 101);

        this.trajectory = 11.0418223845137;
        this.velX = velX * this.game.speed;
        this.velY = -Math.sin(this.trajectory) * 3;
        this.minY = this.game.height - this.game.GROUND_HEIGHT - this.game.player.SIZE + 15;
        
        this.image = tool.qs("#eagle") as CanvasImageSource;

        this.eagleAnimation = new Animation(this.image, this.width, this.height, 0, 0, this.maxFrames, this.maxFrameSpeed);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.eagleAnimation.drawFrame(ctx, this.x, this.y);
    }

    update() {

        if (this.y + this.height > this.minY) {
            this.velY = Math.sin(this.trajectory) * 3;
        }

        this.x -= this.velX;
        this.y += this.velY;
        console.log("eagle y", this.y + this.height);

        if (this.x + this.width < 0) {
            this.markedForDeath = true;
        }
        this.eagleAnimation.loopFrame();
    }
}

export default Eagle;