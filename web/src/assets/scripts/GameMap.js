import { GameObject } from "./GameObject";
import { Wall } from "./Wall";

export class GameMap extends GameObject {
    constructor(ctx,parent){
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;
        this.rows = 13;
        this.cols = 13;

        this.walls = [];
    }

    create_walls(){
        
        //创建二维布尔数组
        const g = [];
        for(let r = 0; r < this.rows; r++)
        {
            g[r] = [];
            for(let c = 0; c < this.cols; c++)
            {
                g[r][c] = false; 
            }
        }

        //给地图四周加上墙
        for(let r = 0; r < this.rows; r++){
            g[r][0] = g[r][this.cols - 1] = true;
        }
        for(let c = 0; c < this.cols; c++){
            g[0][c] = g[this.rows - 1][c] = true;
        }

        for(let r = 0; r < this.rows; r++)
        {
            for(let c = 0; c < this.cols; c++)
            {
                if(g[r][c]){
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }
    }

    start(){
        this.create_walls();
    }

    update_size(){
        this.L = Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows);
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    update(){
        this.update_size();
        this.render();
    }

    render(){
        const color_even = '#A6D042', color_odd = '#AED64B';
        for(let r = 0; r < this.rows; r++)
        {
            for(let c = 0; c < this.cols; c++)
            {
                if((r + c) % 2 == 0){
                    this.ctx.fillStyle = color_even;
                }
                else{
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(r * this.L, c * this.L, this.L, this.L);
            }
        }
    }
}