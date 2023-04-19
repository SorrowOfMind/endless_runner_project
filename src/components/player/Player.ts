import { GameObjectInterface, GameInterface, PlayerInterface } from '../../models/types';
import Animation from "../animations/Animation";

class Player implements GameObjectInterface, PlayerInterface {
    public x: number
    public y: number;

    private game: GameInterface;
    private image: CanvasImageSource;
    private playerAnimation: Animation;
    private yVel: number;
    private isJumping: boolean;
    private isFalling: boolean;
    private isDucking: boolean;
    private isRunning: boolean;
    private prevYVel: number;
    private jumpCount: number;
    private maxFrameSpeed: number;

    readonly SIZE: number = 75;
    readonly SPRITE_MAX_FRAMES = [6, 2, 2, 2];
    private readonly DUCK_HEIGHT = 56;
    private readonly DUCK_OFFSET = 19;
    /**
     * 0 - RUN
     * 1 - JUMP
     * 2 - DEATH
     * 3 - DUCK
     */

    constructor(game: GameInterface, image: CanvasImageSource) {
        this.image = image;
        this.game = game;
        this.x = 100;
        this.y = 315;
        this.yVel = 0;
        this.prevYVel = 0;
        this.isJumping = false;
        this.isFalling = false;
        this.isDucking = false;
        this.jumpCount = 0;
        this.maxFrameSpeed = 30;

        this.playerAnimation = new Animation(this.image, this.SIZE, this.SIZE, 0, 0, 6, this.maxFrameSpeed/this.game.speed);
        this.isRunning = true;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.isDucking) {
            console.log("is ducking")
            this.playerAnimation.drawIrregularFrame(ctx, this.x, this.y, this.SIZE, this.DUCK_HEIGHT, this.DUCK_OFFSET);
            return;
        }
        this.playerAnimation.drawFrame(ctx, this.x, this.y);
    }

    update() {
        if (this.game.keys.includes("up") && !this.isJumping && !this.isDucking) {
            this.yVel -= 32;
            this.isJumping = true;
            this.playerAnimation.switchAnimation(1, this.SPRITE_MAX_FRAMES[1], 38);
            this.isRunning = false;
            this.jumpCount++;
        }

        //checking if the player is falling from a jump
        if (!this.game.keys.includes("up") && this.yVel + this.prevYVel > 0) {
            this.isFalling = true;
        }
        this.prevYVel = this.yVel;

        //perform double jump
        if (this.game.keys.includes("up") && this.isJumping && this.isFalling && this.jumpCount === 1) {
            this.yVel -= 32;
            this.playerAnimation.switchAnimation(1, this.SPRITE_MAX_FRAMES[1], 38);
            this.isRunning = false;
            this.isFalling = false;
            this.jumpCount = 0;
        }

        this.yVel += this.game.GRAVITY;
        this.y += this.yVel;
        this.yVel *= this.game.AIR_RESISTANCE;

        if (this.y > this.game.height - this.game.GROUND_HEIGHT - this.SIZE) {
            this.y = this.game.height - this.game.GROUND_HEIGHT - this.SIZE;
            this.yVel = 0;
            this.isJumping = false;
            this.isFalling = false;
            this.jumpCount = 0;
        }

        if (this.game.keys.length === 0 && !this.isJumping) {
            this.isDucking = false;
            if (!this.isRunning) {
                this.playerAnimation.switchAnimation(0, this.SPRITE_MAX_FRAMES[0], this.maxFrameSpeed/this.game.speed);
                this.isRunning = true;
            }
        }

        if (this.game.keys.includes("down") && !this.isJumping) {
            if (!this.isDucking) {
                this.y += this.DUCK_OFFSET;
                this.playerAnimation.switchAnimation(3, this.SPRITE_MAX_FRAMES[3], this.maxFrameSpeed/this.game.speed);
                this.isDucking = true;
                console.log("player y", this.y);
            }
            this.isRunning = false;
        }

        this.playerAnimation.loopFrame();
    }
}

export default Player;