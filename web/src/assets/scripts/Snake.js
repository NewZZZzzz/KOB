import { GameObject } from "./GameObject";
import { Cell } from "./Cell";

export class Snake extends GameObject{
    constructor(info, gamemap) {
        super();

        this.id = info.id;
        this.color = info.color;
        this.gamemap = gamemap;

        this.cells = [new Cell(info.r, info.c)]; // 存放蛇的身体，cell[0]存放蛇头
        this.next_cell = null; //下一步的位置

        this.speed = 5; //蛇每一秒走5个格子
        this.direction = -1; //-1表示没有指令，0,1,2,3代表上右下左
        this.status = "idle"; // idle表示静止，move表示移动，die表示死亡

        this.dr = [-1, 0, 1, 0]; //四个方向行偏移量
        this.dc = [0, 1, 0, -1]; //四个方向列偏移量

        this.step = 0; //回合数
        this.eps = 1e-2;// 允许的误差
    }

    start(){

    }

    set_direction(d){
        this.direction = d;
    }

    check_tail_increasing(){ // 检查蛇的长度是否增加
        if(this.step <= 10) return true;
        if(this.step % 3 === 1) return true;
        return false;
    }

    next_step(){//将蛇的状态置为走下一步
        const d = this.direction;
        this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
        this.direction = -1;
        this.status = "move";
        this.step ++ ;

        const k = this.cells.length;
        for(let i = k; i > 0; i--){
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));
        }
    }

    update_move(){
        //console.log("move");
        //console.log(" next: " + this.next_cell.x + " " + this.next_cell.y)
        //console.log(" now: " + this.cells[0].x + " " + this.cells[0].y)
        const dx = this.next_cell.x - this.cells[0].x;
        const dy = this.next_cell.y - this.cells[0].y;
        //console.log(dx);
        //console.log(dy);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if(distance < this.eps){
            this.cells[0] = this.next_cell; // 添加一个蛇头
            this.next_cell = null;
            this.status = "idle";

            if(!this.check_tail_increasing()){
                this.cells.pop();
            }
        } else{
            const move_distance = this.speed * this.timedelta / 1000;
            this.cells[0].x += move_distance * dx / distance;
            this.cells[0].y += move_distance * dy / distance;

            if(!this.check_tail_increasing()){
                const k =  this.cells.length;
                const tail = this.cells[k - 1],  tail_target = this.cells[k - 2];
                const tail_dx = tail_target.x - tail.x;
                const tail_dy = tail_target.y - tail.y;
                tail.x += move_distance / distance * tail_dx;
                tail.y += move_distance / distance * tail_dy;
            }
        }
    }

    update(){
       if(this.status === "move"){
         this.update_move();  
       }
        
        this.render();
    }

    render(){
        const L =  this.gamemap.L;
        const ctx = this.gamemap.ctx;

        //画蛇（圆）
        ctx.fillStyle = this.color;
        for(const cell of this.cells){
            ctx.beginPath();
            ctx.arc(cell.x * L, cell.y * L, L/2, 0, Math.PI * 2);
            ctx.fill();
        }

        for(let i = 1; i < this.cells.length; i++){
            const a = this.cells[i - 1], b = this.cells[i];
            if(Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps) continue;
            if(Math.abs(a.x - b.x) < this.eps){
                ctx.fillRect((a.x - 0.5) * L, Math.min(a.y, b.y) * L, L, Math.abs(a.y - b.y) * L)
            }
            else{
                ctx.fillRect(Math.min(a.x, b.x) * L, (a.y - 0.5) * L, Math.abs(a.x - b.x) * L, L)
            }
        }
    }
}