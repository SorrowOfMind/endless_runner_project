abstract class GameObjectModel {
    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract update(deltaTime?: number): void;
}

export default GameObjectModel;