import Enemy from "./Enemy";
import { GameInterface, EnemyInterface } from "../../models/types";
import Animation from "../animations/Animation";
import tool from "../../utils/tool";

class Bee extends Enemy implements EnemyInterface {
    
    private image: CanvasImageSource;
    private velX: number;

    private beeAnimation: Animation;
    private readonly maxFrames = 8;
    private readonly maxFrameSpeed = 20;

    constructor(game: GameInterface, x: number, y: number, velX: number) {
        super(game, x, y, 45, 48);
        this.velX = velX * this.game.speed;
        this.image = tool.qs("#bee") as CanvasImageSource;

        this.beeAnimation = new Animation(this.image, this.width, this.height, 0, 0, this.maxFrames, this.maxFrameSpeed);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.beeAnimation.drawFrame(ctx, this.x, this.y);
    }

    update() {
        this.x -= this.velX;
        if (this.x + this.width < 0) {
            this.markedForDeath = true;
        }
        this.beeAnimation.loopFrame();
    }
}

export default Bee;