
class Animation {
    private image: CanvasImageSource;
    private width: number;
    private height: number;
    private currentFrameX: number;
    private currentFrameY: number;
    private maxFrames: number;
    private frameSpeed: number
    private frameThrottle: number;

    constructor(image: CanvasImageSource, width: number, height: number, currentFrameX: number, currentFrameY: number, maxFrames: number, frameThrottle: number) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.currentFrameX = currentFrameX;
        this.currentFrameY = currentFrameY;
        this.maxFrames = maxFrames;

        this.frameSpeed = 0;
        this.frameThrottle = frameThrottle;
    }

    drawFrame(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.drawImage(
            this.image, 
            this.currentFrameX * this.width, 
            this.currentFrameY * this.height, 
            this.width, 
            this.height, 
            x, 
            y, 
            this.width, 
            this.height
        );
    }

    drawIrregularFrame(ctx: CanvasRenderingContext2D, x: number, y: number, frameWidth: number, frameHeight: number, offset: number) {
        ctx.drawImage(
            this.image, 
            this.currentFrameX * this.width, 
            this.currentFrameY * this.height, 
            frameWidth, 
            frameHeight, 
            x, 
            y + offset, 
            frameWidth, 
            frameHeight
        );
    }

    loopFrame() {
        this.currentFrameX = Math.floor(this.frameSpeed/this.frameThrottle) % this.maxFrames;
        this.frameSpeed++;
    }

    switchAnimation(frameY: number, maxFrames: number, frameThrottle?: number) {
        this.currentFrameX = 0;
        this.currentFrameY = frameY;
        this.maxFrames = maxFrames;
        this.frameThrottle = frameThrottle ?? this.frameThrottle;
        this.frameSpeed = 0;
    }
}

export default Animation;