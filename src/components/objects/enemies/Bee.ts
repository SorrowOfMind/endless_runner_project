import GameObject from "../GameObject";
import { GameInterface, EnemyInterface } from "../../../models/types";
import Animation from "../../animations/Animation";
import tool from "../../../utils/tool";

class Bee extends GameObject implements EnemyInterface {
    public markedForDeath: boolean;

    protected velX: number;
    protected velY: number;
    protected animation: Animation;
    protected image: CanvasImageSource;

    private readonly MAX_FRAMES = 8;
    private readonly MAX_FRAMES_SPEED = 20;

    constructor(game: GameInterface, x: number, y: number, velX: number) {
        super(game, x, y, 45, 48);
        this.velX = velX * this.game.speed;
        this.velY = 0;
        this.image = tool.id("bee") as CanvasImageSource;
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

export default Bee;