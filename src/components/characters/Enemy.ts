import { GameInterface, EnemyInterface } from './../../models/types';

class Enemy {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public markedForDeath: boolean;

    protected game: GameInterface;

    constructor(game: GameInterface, x: number, y: number, width: number, height: number) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.markedForDeath = false;
    }
}

export default Enemy;