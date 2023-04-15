import {Background, Controller} from "../components";


export interface GameInterface {
    ctx: CanvasRenderingContext2D | null;
    width: number;
    height: number;
    speed: number;
    background: Background;
    player: PlayerInterface;
    controller: Controller;
    keys: string[];
    readonly GRAVITY: number;
    readonly GROUND_HEIGHT: number
}


export interface PlayerInterface {
    x: number;
    y: number;
    readonly SIZE: number;
    readonly SPRITE_MAX_FRAMES: number[];
    update: (deltatime?: number) => void;
    draw: (ctx: CanvasRenderingContext2D) => void;
}