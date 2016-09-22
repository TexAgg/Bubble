// https://github.com/TexAgg/Minesweeper/tree/master/src/scripts

import {Bubble} from "./Bubble";

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('my_canvas');
let ctx = canvas.getContext("2d");

document.getElementById('x').setAttribute('max', String(canvas.width));
document.getElementById('y').setAttribute('max', String(canvas.height));

let ball_radius: number = 30;
let balls: Array< Bubble > = []; //Storage for all the Bubbles
let max_balls: number = 30;