import { GameObject } from "./GameObject";
import { Snake } from "./Snake";
import { Wall } from "./Wall";

export class GameMap extends GameObject {
    constructor(ctx,parent){
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;
        this.rows = 13;
        this.cols = 14;

        this.inner_wall_count = 20;
        this.walls = [];

        this.snakes = [
            new Snake({id: 0, color: "#EE4B49", r: this.rows - 2, c: 1}, this),
            new Snake({id: 1, color: "#5376EE", r: 1, c: this.cols - 2}, this),
        ]
    }

    //source, target
    //dfs
    check_connectivity(g, sx, sy, tx, ty){
        if(sx == tx && sy == ty) return true;
        g[sx][sy] = true; //标记已经走过的路

        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for(let i = 0; i < 4; i++){
            let x = sx + dx[i], y = sy + dy[i];
            if(!g[x][y] && this.check_connectivity(g, x, y, tx, ty)) return true;
        }
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

         //随机生成墙
        for(let i = 0; i < this.inner_wall_count / 2; i++)
        {
            for(let j = 0; j < 1000; j++)
            {
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);

                if(g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]) continue; //中心对称
                if((r == this.rows - 2 && c == 1) || (r == 1 && c  == this.cols - 2)) continue;

                g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true; //中心对称
                break;
            }
        }

        const cop_g = JSON.parse(JSON.stringify(g)); //深度复制对象
        if(!this.check_connectivity(cop_g, this.rows - 2, 1, 1, this.cols - 2)) return false;

        for(let r = 0; r < this.rows; r++)
        {
            for(let c = 0; c < this.cols; c++)
            {
                if(g[r][c]){
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }

        return true;
    }

    add_listening_events(){
        this.ctx.canvas.focus();

        const [snake0, snake1] = this.snakes;
        this.ctx.canvas.addEventListener("keydown", e=> {
            //console.log(e.key);
            if (e.key === 'w') snake0.set_direction(0);
            else if(e.key === 'd') snake0.set_direction(1);
            else if(e.key === 's') snake0.set_direction(2);
            else if(e.key === 'a') snake0.set_direction(3);
            else if(e.key === 'ArrowUp') snake1.set_direction(0)
            else if(e.key === 'ArrowRight') snake1.set_direction(1);
            else if(e.key === 'ArrowDown') snake1.set_direction(2);
            else if(e.key === 'ArrowLeft') snake1.set_direction(3);
            //console.log(snake0.direction+" "+snake1.direction);
        });
    }

    start(){
        for(let i = 0; i < 1000; i++){
            if(this.create_walls())  break;
        }
        
        this.add_listening_events();
    }

    update_size(){
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    check_ready(){ //判断两条蛇是否准备好下一回合
        for(const snake of this.snakes){
            if(snake.status !== "idle") return false;
            if(snake.direction === -1) return false;
        }
        return true;
    }

    next_step(){//进入下一回合
        for(const snake of this.snakes){
            snake.next_step();
            console.log("next_step");
        }
    }

    update(){
        this.update_size();
        if(this.check_ready()){
            this.next_step();
        }
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