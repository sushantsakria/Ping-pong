class Vec{
  constructor(x=0,y=0)
  {
    this.x=x;
    this.y=y;
  }
}

class Rect{
  constructor(w,h)
  {
    this.pos=new Vec ;
    this.size=new Vec(w,h);
  }
  get right(){
    return this.pos.x+this.size.x/2;
  }
  
  get left(){
    return this.pos.x-this.size.x/2;
  }
  
  get bottom(){
    return this.pos.y+this.size.y/2;
  }
  
  get top(){
    return this.pos.y-this.size.y/2;
  }
}

class Ball extends Rect{
  constructor(){
    super(10,10);
    this.vel=new Vec;
  }
}

class Player extends Rect{
  constructor(){
    super(20,100);
    this.score=0
  }
}

const canvas=document.getElementById('pong');
const context=canvas.getContext('2d');
let lastime;

function callback(milis){
  if(lastime){
    update((milis-lastime)/1000);

  }
  lastime=milis;
  window.requestAnimationFrame(callback);

}
const ball= new Ball();


ball.pos.x=canvas.width/2;
ball.pos.y=canvas.height/2;
ball.vel.x=0;
ball.vel.y=0;
players=[new Player,new Player];

players[0].pos.x=40;
players[1].pos.x=canvas.width-40;
players[0].pos.y=canvas.height/2;
players[1].pos.y=canvas.height/2;

function start(){
  if(ball.vel.x===0&&ball.vel.y===0)
  {
    ball.vel.x=300*(Math.random()>.5? 1:-1);
    ball.vel.y=100*(Math.random()>.5?1:-1)
  }
}


function reset(){
  ball.pos.x=canvas.width/2;
ball.pos.y=canvas.height/2;
ball.vel.x=0;
ball.vel.y=0;
}



function collision(player,ball){
if(ball.right>player.left&&ball.left<player.right&&player.top<ball.bottom&&player.bottom>ball.top){
  ball.vel.x=-ball.vel.x*1.1;
  ball.vel.y=ball.vel.y*1.05;
}

}

function drawRect(rectan)
{
context.fillStyle='#fff';
context.fillRect(rectan.left,rectan.top,rectan.size.x,rectan.size.y);
}

function draw(){
  context.fillStyle='#000';
context.fillRect(0,0,canvas.width,canvas.height);
drawRect(ball);
players.forEach(player=>{
  drawRect(player);
});

}


function update(dt){
  ball.pos.x+=ball.vel.x*dt;
  ball.pos.y+=ball.vel.y*dt;

if(ball.left<0||ball.right>canvas.width){
  let win;
  if(ball.vel.x<0)
  {
    win=1;
  }
  else
  win=0;

players[win].score++;
reset();
}
if(ball.top<0||ball.bottom>canvas.height){
  ball.vel.y=-ball.vel.y;
}
players[1].pos.y=ball.pos.y;
draw();
players.forEach(play=>collision(play,ball));
}
canvas.addEventListener('mousemove',event=>{
  players[0].pos.y=event.offsetY;
});
callback();
canvas.addEventListener('click',start);
