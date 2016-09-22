// https://github.com/TexAgg/Minesweeper/blob/master/src/scripts/Square.ts

export class Bubble
{
	public pt: [number, number];

	private speed: [number, number];
	private radius: number;
	private color;
	private ctx: CanvasRenderingContext2D;

	constructor(pt: [number, number], speed: number, radius: number, ctx: CanvasRenderingContext2D)
	{
		this.pt = pt;
		this.radius = radius;
		this.speed[0] = speed * Bubble.pm1();
		this.speed[1] = speed * Bubble.pm1();
		//Random color: http://www.paulirish.com/2009/random-hex-color-code-snippets/
		this.color = "#" + Math.random().toString(16).slice(2, 8);
		this.ctx = ctx;
	}

	public static pm1(): number
	{
		if (Math.random() < 0.5)
			return -1;
		else
			return 1;
	}

	public label(): void
	{
		this.ctx.font = '20px sans-serif';
		this.ctx.fillStyle = '#000000';
	}
}