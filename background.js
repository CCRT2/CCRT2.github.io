const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let width;
let height;

function resize(){

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

}

window.addEventListener("resize", resize);

resize();

const mouse = {

    x:9999,
    y:9999

};

window.addEventListener("mousemove",(e)=>{

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});

window.addEventListener("mouseleave",()=>{

    mouse.x = 9999;
    mouse.y = 9999;

});

class Particle{

    constructor(){

        this.reset();

    }

    reset(){

        this.x = Math.random()*width;
        this.y = Math.random()*height;

        this.vx = (Math.random()-.5)*0.35;
        this.vy = (Math.random()-.5)*0.35;

        this.size = 2 + Math.random()*2;

    }

    update(){

        this.x += this.vx;
        this.y += this.vy;

        if(this.x<0||this.x>width) this.vx*=-1;
        if(this.y<0||this.y>height) this.vy*=-1;

        const dx = mouse.x-this.x;
        const dy = mouse.y-this.y;

        const distance = Math.sqrt(dx*dx+dy*dy);

        if(distance<120){

            this.x -= dx*0.003;
            this.y -= dy*0.003;

        }

    }

    draw(){

        ctx.beginPath();

        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);

        ctx.fillStyle="#2563eb";

        ctx.fill();

    }

}

const particles=[];

for(let i=0;i<90;i++){

    particles.push(new Particle());

}

function connect(){

    for(let a=0;a<particles.length;a++){

        for(let b=a;b<particles.length;b++){

            const dx = particles[a].x-particles[b].x;
            const dy = particles[a].y-particles[b].y;

            const distance = Math.sqrt(dx*dx+dy*dy);

            if(distance<130){

                ctx.strokeStyle=`rgba(37,99,235,${1-distance/130})`;

                ctx.lineWidth=1;

                ctx.beginPath();

                ctx.moveTo(particles[a].x,particles[a].y);

                ctx.lineTo(particles[b].x,particles[b].y);

                ctx.stroke();

            }

        }

    }

}

function animate(){

    ctx.clearRect(0,0,width,height);

    connect();

    particles.forEach(p=>{

        p.update();

        p.draw();

    });

    requestAnimationFrame(animate);

}

animate();
