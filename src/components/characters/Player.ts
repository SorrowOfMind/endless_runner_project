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
    private isDucking: boolean;
    private isRunning: boolean;
    private maxSpeed: number;

    readonly SIZE: number = 75;
    readonly SPRITE_MAX_FRAMES = [6, 2, 2, 2];
    /**
     * 0 - RUN
     * 1 - JUMP
     * 2 - DEATH
     * 3 - DUCK
     */

    constructor(game: GameInterface, image: CanvasImageSource) {
        super();
        this.image = image;
        this.game = game;
        this.x = 90;
        this.y = 315;
        this.yVel = 0;
        this.isJumping = false;
        this.isDucking = false;
        this.maxSpeed = 30;

        this.playerAnimation = new Animation(this.image, this.SIZE, 0, 0, 6, this.maxSpeed/this.game.speed);
        this.isRunning = true;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.playerAnimation.drawFrame(ctx, this.x, this.y);
    }

    update() {
        if (this.game.keys.includes("up") && !this.isJumping && !this.isDucking) {
            this.yVel -= 30;
            this.isJumping = true;
            this.playerAnimation.switchAnimation(1, this.SPRITE_MAX_FRAMES[1], 38);
            this.isRunning = false;
        }

        this.yVel += this.game.GRAVITY;
        this.y += this.yVel;
        this.yVel *= 0.9;
     

        if (this.y > this.game.height - this.game.GROUND_HEIGHT - this.SIZE) {
            this.y = this.game.height - this.game.GROUND_HEIGHT - this.SIZE;
            this.yVel = 0;
            this.isJumping = false;
        }

        if (this.game.keys.length === 0 && !this.isJumping) {
            this.isDucking = false;
            if (!this.isRunning) {
                this.playerAnimation.switchAnimation(0, this.SPRITE_MAX_FRAMES[0], this.maxSpeed/this.game.speed);
                this.isRunning = true;
            }
        }

        if (this.game.keys.includes("down") && !this.isJumping) {
            if (!this.isDucking) {
                this.playerAnimation.switchAnimation(3, this.SPRITE_MAX_FRAMES[3], this.maxSpeed/this.game.speed);
                this.isDucking = true;
            }
            this.isRunning = false;
        }

        this.playerAnimation.loopFrame();
    }
}

export default Player;