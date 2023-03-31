import Game from "./Game";
import './style.css';
import tool from "./utils/tool";

window.addEventListener('load', function() {
   let game = new Game((tool.id("cvs") as HTMLCanvasElement),  800, 500);
   game.loop(0);
});