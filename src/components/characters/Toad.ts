import Enemy from "./Enemy";
import { GameInterface, EnemyInterface } from "../../models/types";
import Animation from "../animations/Animation";
import tool from "../../utils/tool";

class Toad extends Enemy implements EnemyInterface {
    
    private image: CanvasImageSource;
    private velX: number;

    private toadAnimation: Animation;
    private readonly maxFrames = 4;
    private readonly maxFrameSpeed = 20;

    constructor(game: GameInterface, x: number, y: number) {
        super(game, x, y, 45, 30);
        this.velX = this.game.speed * 1.5;
        this.image = tool.qs("#toad") as CanvasImageSource;

        this.toadAnimation = new Animation(this.image, this.width, this.height, 0, 0, this.maxFrames, this.maxFrameSpeed);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.toadAnimation.drawFrame(ctx, this.x, this.y);
    }

    update() {
        this.x -= this.velX;
        if (this.x + this.width < 0) {
            this.markedForDeath = true;
        }
        this.toadAnimation.loopFrame();
    }
}

export default Toad;