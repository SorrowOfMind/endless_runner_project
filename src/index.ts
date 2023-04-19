import Game from "./Game";
import {Intro} from "./components";
import './style.css';
import tool from "./utils/tool";

window.addEventListener('load', function() {
   const game = new Game((tool.id("cvs") as HTMLCanvasElement),  1000, 600);
   const intro = new Intro((tool.id("intro") as HTMLDivElement), () => game.loop(0));
});