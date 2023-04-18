import { GameInterface, EnemyInterface, EnemyManagerInterface } from '../../models/types';
import Toad from "../characters/Toad";
import Bee from "../characters/Bee";
import Eagle from "../characters/Eagle";
import getRandomValue from '../../utils/randomValue';

class EnemiesManager implements EnemyManagerInterface {
    public activeEnemies: EnemyInterface[];

    private game: GameInterface;
    private counter: number;
    private delay: number;

    constructor(game: GameInterface) {
        this.game = game;
        this.activeEnemies = [];
        this.counter = 0;
        this.delay = getRandomValue(100, 400);
    }

    spawn() {
        this.counter++;
        if (this.counter === this.delay) {
            this.getEnemy(getRandomValue(1, 3))
            this.counter = 0;
            this.delay = getRandomValue(100, 400);
        }
    }

    draw() {
        this.activeEnemies.forEach(enemy => {
            enemy.draw(this.game.ctx as CanvasRenderingContext2D);
        });
    }

    update() {
        this.activeEnemies.forEach(enemy => {
            enemy.update();
            //check collisions with the player
        });

        this.activeEnemies = this.activeEnemies.filter(enemy => !enemy.markedForDeath);
    }

    private getEnemy(randomEnemy: number) {
        let enemy: EnemyInterface;
        switch(randomEnemy) {
            case 1:
                enemy = new Toad(this.game, getRandomValue(1100, 1300), 440);
                break;
            case 2:
                enemy = new Bee(this.game, getRandomValue(1100, 1200), getRandomValue(150, 350), getRandomValue(1, 3));
                break;
            case 3:
                enemy = new Eagle(this.game, 1150, -100, 3);
                break;
            default:
                enemy = new Toad(this.game, getRandomValue(1100, 1300), 360);
                break;
        }

        this.activeEnemies.push(enemy);
        console.log(this.activeEnemies)
    }




}

export default EnemiesManager;