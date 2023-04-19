import {Background, Controller} from "../components";

export interface GameObjectInterface {
    draw(ctx: CanvasRenderingContext2D): void;
    update(deltaTime?: number): void;
}

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
    readonly GROUND_HEIGHT: number;
    readonly AIR_RESISTANCE: number;
}


export interface PlayerInterface extends GameObjectInterface {
    x: number;
    y: number;
    readonly SIZE: number;
    readonly SPRITE_MAX_FRAMES: number[];
}

export interface EnemyInterface extends GameObjectInterface {
    x: number;
    y: number;
    width: number;
    height: number;
    markedForDeath: boolean;
}

export interface EnemyManagerInterface extends GameObjectInterface {
    activeEnemies: EnemyInterface[];
    spawn: () => void;
}