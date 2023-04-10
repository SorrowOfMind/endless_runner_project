
class Animation {
    private image: CanvasImageSource;
    private size: number;
    private currentFrameX: number;
    private currentFrameY: number;
    private maxFrames: number;
    private frameSpeed: number
    private frameThrottle: number;


    constructor(image: CanvasImageSource, size: number, currentFrameX: number, currentFrameY: number, maxFrames: number, frameThrottle: number) {
        this.image = image;
        this.size = size;
        this.currentFrameX = currentFrameX;
        this.currentFrameY = currentFrameY;
        this.maxFrames = maxFrames;

        this.frameSpeed = 0;
        this.frameThrottle = frameThrottle;
    }

    drawFrame(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.drawImage(
            this.image, 
            this.currentFrameX * this.size, 
            this.currentFrameY * this.size, 
            this.size, 
            this.size, 
            x, 
            y, 
            this.size, 
            this.size
        );
    }

    loopFrame() {
        this.currentFrameX = Math.floor(this.frameSpeed/this.frameThrottle) % this.maxFrames;
        this.frameSpeed++;
    }

    switchAnimation(frameY: number, maxFrames: number) {
        this.currentFrameX = 0;
        this.currentFrameY = frameY;
        this.maxFrames = maxFrames;
    }
}

export default Animation;