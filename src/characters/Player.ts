import { GameInterface } from './../models/interfaces';
import GameObjectModel from "../models/GameObjectModel";
import Animation from "../animations/Animation";

class Player extends GameObjectModel {

    private game: GameInterface;
    private image: CanvasImageSource;
    private x: number
    private y: number;
    private playerAnimation: Animation;

    readonly SIZE: number = 75;
    readonly SPRITE_MAX_FRAMES = [6, 2, 2]; 

    constructor(game: GameInterface, image: CanvasImageSource) {
        super();
        this.image = image;
        this.game = game;
        this.x = 80;
        this.y = 315;

        this.playerAnimation = new Animation(this.image, this.SIZE, 0, 0, 6, 15)
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.playerAnimation.drawFrame(ctx, this.x, this.y);
    }

    update() {
        this.playerAnimation.loopFrame();
    }
    
}

export default Player;