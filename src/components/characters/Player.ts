import { GameInterface, PlayerInterface } from '../../models/types';
import GameObjectModel from "../../models/GameObjectModel";
import Animation from "../animations/Animation";

class Player extends GameObjectModel implements PlayerInterface {
    public x: number
    public y: number;

    private game: GameInterface;
    private image: CanvasImageSource;
    private playerAnimation: Animation;
    private yVel: number;
    private isJumping: boolean;
    private isRunAnimationSet: boolean;

    readonly SIZE: number = 75;
    readonly SPRITE_MAX_FRAMES = [6, 2, 2]; 

    constructor(game: GameInterface, image: CanvasImageSource) {
        super();
        this.image = image;
        this.game = game;
        this.x = 90;
        this.y = 315;
        this.yVel = 0;
        this.isJumping = false;

        this.playerAnimation = new Animation(this.image, this.SIZE, 0, 0, 6, 15);
        this.isRunAnimationSet = true;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.playerAnimation.drawFrame(ctx, this.x, this.y);
    }

    update() {
        if (this.game.keys.includes("up") && !this.isJumping) {
            this.yVel -= 30;
            this.isJumping = true;
            this.playerAnimation.switchAnimation(1, 2, 38);
            this.isRunAnimationSet = false;
        }

        this.yVel += this.game.GRAVITY;
        this.y += this.yVel;
        this.yVel *= 0.9;

        if (this.y > this.game.height - this.game.GROUND_HEIGHT - this.SIZE) {
            this.y = this.game.height - this.game.GROUND_HEIGHT - this.SIZE;
            this.yVel = 0;
            this.isJumping = false;
            if (!this.isRunAnimationSet) {
                this.playerAnimation.switchAnimation(0, 6, 15);
                this.isRunAnimationSet = true;
            }
        }

        this.playerAnimation.loopFrame();
    }
    
}

export default Player;