import { GameInterface } from '../../models/types';
import GameObjectModel from "../../models/GameObjectModel";

class BackgroundLayer extends GameObjectModel {
    private game: GameInterface;
    private image: CanvasImageSource;
    private speedFactor: number;
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor(game: GameInterface, image: CanvasImageSource, speedFactor: number) {
        super();
        this.game = game;
        this.image = image;
        this.speedFactor = speedFactor;
        this.x = 0;
        this.y = 0;
        this.width = this.game.width;
        this.height = this.game.height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width - 1, this.y, this.width, this.height);
    }

    update() {
        if (this.x <= - this.width) {
            this.x = 0;
            return;
        }

        this.x -= this.game.speed * this.speedFactor;
    }
}

class Background extends GameObjectModel {
    private game: GameInterface;
    private backgrounds: BackgroundLayer[];

    constructor(game: GameInterface, images: HTMLImageElement[]) {
        super();
        this.game = game;
        this.backgrounds = [];

        this.createLayers(images);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.backgrounds.forEach(bg => bg.draw(ctx));
    }

    update() {
        this.backgrounds.forEach(bg => bg.update());
    }

    private createLayers(images: HTMLImageElement[]) {
        return images.map((img, idx) => {
            this.backgrounds.push(new BackgroundLayer(this.game, img, (1 + idx)/2));
        });
    }
}

export default Background;