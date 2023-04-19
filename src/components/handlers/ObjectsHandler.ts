import { GameInterface, EnemyInterface, GemInterface, ObjectsHandlerInterface } from '../../models/types';
import {Toad, Bee, Eagle, Oposum, Gem} from "../objects";
import getRandomValue from '../../utils/randomValue';

class ObjectsHandler implements ObjectsHandlerInterface {
    public activeEnemies: EnemyInterface[];
    public activeGems: GemInterface[];

    private game: GameInterface;
    private counter: number;
    private delay: number;

    constructor(game: GameInterface) {
        this.game = game;
        this.activeEnemies = [];
        this.activeGems = [];
        this.counter = 0;
        this.delay = getRandomValue(100, 400);
    }

    spawn() {
        this.counter++;
        if (this.counter === this.delay) {
            this.createEnemy(getRandomValue(1, 4));
            this.createCherry();
            this.counter = 0;
            this.delay = getRandomValue(100, 400);
        }
    }

    draw(ctx:  CanvasRenderingContext2D) {
        this.activeEnemies.forEach(enemy => enemy.draw(ctx));
        this.activeGems.forEach(gem => gem.draw(ctx));
    }

    update() {
        this.activeEnemies.forEach(enemy => {
            enemy.update();
            //check collisions with the player

        });
        this.activeGems.forEach(gem => {
            gem.update();
            //check collisions with the player and add point if picked

        });

        this.activeEnemies = this.activeEnemies.filter(enemy => !enemy.markedForDeath);
        this.activeGems = this.activeGems.filter(cherry => !cherry.markedForDeath && !cherry.picked);
    }

    private createEnemy(randomEnemy: number) {
        let enemy: EnemyInterface;
        switch(randomEnemy) {
            case 1:
                enemy = new Toad(this.game, getRandomValue(1100, 1300), 430);
                break;
            case 2:
                enemy = new Bee(this.game, getRandomValue(1100, 1300), getRandomValue(150, 410), getRandomValue(2, 3));
                break;
            case 3:
                enemy = new Eagle(this.game, 1150, -100, 3);
                break;
            case 4:
                enemy = new Oposum(this.game, getRandomValue(1100, 1300), 420, getRandomValue(2, 4));
                break;
            default:
                enemy = new Toad(this.game, getRandomValue(1100, 1300), 360);
                break;
        }

        this.activeEnemies.push(enemy);
    }

    private createCherry() {
        const gem = new Gem(this.game, getRandomValue(1100, 1300), getRandomValue(50, 330));
        this.activeGems.push(gem);
    }
}

export default ObjectsHandler;