import GameObject from "../GameObject";
import { GameInterface, EnemyInterface } from "../../../models/types";
import Animation from "../../animations/Animation";
import tool from "../../../utils/tool";

class Oposum extends GameObject implements EnemyInterface {
    public markedForDeath: boolean;

    protected velX: number;
    protected velY: number;
    protected animation: Animation;
    protected image: CanvasImageSource;

    private readonly MAX_FRAMES = 6;
    private readonly MAX_FRAMES_SPEED = 10;

    constructor(game: GameInterface, x: number, y: number, velX: number) {
        super(game, x, y, 70, 50);
        this.velX = velX * this.game.speed;
        this.velY = 0;
        this.markedForDeath = false;
        this.image = tool.id("oposum") as CanvasImageSource;
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

export default Oposum;