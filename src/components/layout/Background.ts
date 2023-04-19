import { GameInterface, ObjectInterface, GameObjectInterface } from '../../models/types';

class BackgroundLayer implements GameObjectInterface {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    private game: GameInterface;
    private image: CanvasImageSource;
    private speedFactor: number;

    constructor(game: GameInterface, image: CanvasImageSource, speedFactor: number) {
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
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }

    update() {
        if (this.x <= - this.width) {
            this.x = 0;
            return;
        }

        this.x -= this.game.speed * this.speedFactor;
    }
}

class Background implements ObjectInterface {
    private game: GameInterface;
    private backgrounds: BackgroundLayer[];

    constructor(game: GameInterface, images: HTMLImageElement[]) {
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