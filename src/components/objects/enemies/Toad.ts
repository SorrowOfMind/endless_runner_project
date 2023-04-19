import GameObject from "../GameObject";
import { GameInterface, EnemyInterface } from "../../../models/types";
import Animation from "../../animations/Animation";
import tool from "../../../utils/tool";

class Toad extends GameObject implements EnemyInterface {
    public markedForDeath: boolean;

    protected velX: number;
    protected velY: number;
    protected animation: Animation;
    protected image: CanvasImageSource;

    private readonly MAX_FRAMES = 4;
    private readonly MAX_FRAMES_SPEED = 20;

    constructor(game: GameInterface, x: number, y: number) {
        super(game, x, y, 55, 37);
        this.velX = this.game.speed * 1.5;
        this.velY = 0;
        this.image = tool.id("toad") as CanvasImageSource;
        this.markedForDeath = false;
        this.animation = new Animation(this.image, this.width, this.height, 0, 0, this.MAX_FRAMES, this.MAX_FRAMES_SPEED);
    }

    update() {
        this.x -= this.velX;
        if (this.x + this.width < 0) {
            this.markedForDeath = true;
            return;
        }
        this.animation.loopFrame();
    }
}

export default Toad;