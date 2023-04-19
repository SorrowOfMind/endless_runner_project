import Enemy from "./Enemy";
import { GameInterface, EnemyInterface } from "../../models/types";
import Animation from "../animations/Animation";
import tool from "../../utils/tool";

class Oposum extends Enemy implements EnemyInterface {
    
    private image: CanvasImageSource;
    private velX: number;

    private oposumAnimation: Animation;
    private readonly maxFrames = 6;
    private readonly maxFrameSpeed = 10;

    constructor(game: GameInterface, x: number, y: number, velX: number) {
        super(game, x, y, 70, 50);
        this.velX = velX * this.game.speed;
        this.image = tool.qs("#oposum") as CanvasImageSource;

        this.oposumAnimation = new Animation(this.image, this.width, this.height, 0, 0, this.maxFrames, this.maxFrameSpeed);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.oposumAnimation.drawFrame(ctx, this.x, this.y);
    }

    update() {
        this.x -= this.velX;
        if (this.x + this.width < 0) {
            this.markedForDeath = true;
        }
        this.oposumAnimation.loopFrame();
    }
}

export default Oposum;