import { Background, InputHandler } from "../components";

export interface ObjectInterface {
  draw(ctx: CanvasRenderingContext2D): void;
  update(deltaTime?: number): void;
}

export interface GameObjectInterface extends ObjectInterface {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GameInterface {
  isRunning: boolean;
  width: number;
  height: number;
  speed: number;
  background: Background;
  player: PlayerInterface;
  inputHandler: InputHandler;
  keys: string[];
  gemsCollected: number;
  gameOverProcedure: () => void;
  readonly GRAVITY: number;
  readonly GROUND_HEIGHT: number;
  readonly AIR_RESISTANCE: number;
}

export interface PlayerInterface extends GameObjectInterface {
  dead: boolean;
  isDucking: boolean;
  resetPlayer: () => void;
}

export interface EnemyInterface extends GameObjectInterface {
  markedForDeath: boolean;
}

export interface GemInterface extends EnemyInterface {
  picked: boolean;
}

export interface ObjectsHandlerInterface extends ObjectInterface {
  activeEnemies: EnemyInterface[];
  activeGems: GemInterface[];
  spawn: () => void;
}
