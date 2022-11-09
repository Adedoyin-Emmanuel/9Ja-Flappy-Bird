var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

//remove the browser default margin and padding
document.body.style.margin=0;
document.body.style.padding=0;
addEventListener("load",()=>{
	canvas.height=innerHeight;
	canvas.width=innerWidth;

	init();
})


addEventListener("resize",()=>{
	canvas.height=innerHeight;
	canvas.width=innerWidth;

	init();
})



function randomNumber(max,min){
	return Math.floor(Math.random()*(max-min+1))+min;
}

function getDist(x1,y1,x2,y2){
	let x=x2-x1;
	let y=y2-y1;

	return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
}

  let mouse={
  	x:undefined,
  	y:undefined,
  	radius:100
  };

	let particles;
	let player;
	let frame=0;
	let stars;
	let miniStars;
	let ticker=0;
	let randomInt=75;
	let randomFrame=50;


class Star{
	constructor(x,y,radius,color){
		this.x=x;
		this.y=y;
		this.radius=radius;
		this.color=color;
		this.friction=0.99;
		this.gravity=1;
		this.velocity={
			dx:randomNumber(5,-3),
			dy:randomNumber(5,-5)
		};

		//create the draw function
		this.draw=()=>{
			ctx.save();
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,true);
			ctx.fillStyle=this.color;
			ctx.fill();
			ctx.strokeStyle=this.color;
			ctx.stroke();
			ctx.closePath();
			ctx.restore();

		};

		this.update=()=>{

		if(this.y+this.radius+this.velocity.dy>canvas.height||this.y-this.radius+this.velocity.dy<0){
			this.radius--;
			this.velocity.dy=-this.velocity.dy*this.friction;
			this.explode();
		 }else{
		 	this.velocity.dy+=this.gravity;
		 }


		if(this.x+this.radius+this.velocity.dx>canvas.width||this.x-this.radius+this.velocity.dx<0){
			this.radius--;
			this.velocity.dx=-this.velocity.dx*this.friction;
			this.explode();
		 }else{
		 	this.velocity.dx+=this.gravity;
		 }

			this.y+=this.velocity.dy;
			//this.x+=this.velocity.dx;
			this.draw();

		};

		this.explode=()=>{
			for(let z=0; z<10; z++){
				miniStars.push(new MiniStar(this.x,this.y,2,undefined));
			}
		}
	}
}

class MiniStar{
	constructor(x,y,radius,color){
			this.x=x;
			this.y=y;
			this.radius=radius;
			this.color=color;
			this.gravity=0.1;
			this.ttl=100;
			this.opacity=1;
			this.friction=0.99;
			this.velocity={
			dx:randomNumber(25,-25),
			dy:randomNumber(25,-25)
		};

		//create the draw function
		this.draw=()=>{
			ctx.save();
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,true);
			ctx.fillStyle=this.color;
			ctx.fill();
			ctx.strokeStyle=this.color;
			ctx.stroke();
			ctx.closePath();
			ctx.restore();

		};

		this.update=()=>{
			if(this.y+this.radius+this.velocity.dy>canvas.height){
				this.velocity.dy=-this.velocity.dy*this.friction;
			}else{
				this.velocity.dy+=this.gravity;
			}

			if(this.x+this.radius+this.velocity.dx>canvas.width){
				this.velocity.dx=-this.velocity.dx*this.friction;
			}else{
				this.velocity.dx+=this.gravity;
			}
			this.ttl--;
			this.opacity-=1/this.ttl;
			this.y+=this.velocity.dy;
			this.x+=this.velocity.dx;
			this.draw();

		};
	}
}



class Particle{
	constructor(x,y,radius,color){
		this.x=x;
		this.y=y;
		this.radius=radius;
		this.color=color;
		this.friction=0.9;
		this.gravity=1;
		this.angle=0;
		this.angleSpeed=randomNumber(20,10);
		this.velocity={
			dx:randomNumber(10,-10),
			dy:randomNumber(10,-10)
		};
		//create the draw function
		this.draw=()=>{
			ctx.save();
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,true);
			ctx.fillStyle=this.color;
			ctx.fill();
			ctx.strokeStyle=this.color;
			ctx.stroke();
			ctx.shadowColor=this.color;
			ctx.shadowBlur=20;
			ctx.closePath();
			ctx.restore();
		}

		this.update=()=>{
			this.y+=this.velocity.dy;
	        this.x+=this.velocity.dx;
			this.draw();


		}


	addEventListener("mousemove",(e)=>{
  	mouse.x=e.clientX;
  	mouse.y=e.clientY;

  	let dx=mouse.x-this.x;
  	let dy=mouse.y-this.y;
  	let dist=Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
  	let forceX=dx/dist;
  	let forceY=dy/dist;
  	let maxDist=mouse.radius;
  	let force=(maxDist-dist)/maxDist;
  	let directionX=forceX*force*this.angle;
  	let directionY=forceY*force*this.angle;
  	if(getDist(mouse.x,mouse.y,this.x,this.y)<80){
  		this.x-=directionX
  		this.y-=directionY;
  		this.angle+=this.angleSpeed;

  	}
  	
  })

	}
}



function init(){
	particles=[];
	stars=[];
	miniStars=[];
	for (var i = 0; i < 300; i++) {
		let radius=1;
		let color="white";
		let x=randomNumber(canvas.width-radius,radius);
		let y=randomNumber(canvas.height-radius,radius);
		particles.push(new Particle(x,y,radius,color));
		
	}

	/*for(let d=0; d<1; d++){
		let radius=randomNumber(30,25);
		let x=canvas.width/2;
		let y=randomNumber(70-radius,radius);
		let color="white";
		stars.push(new Star(x,y,radius,color));
	}*/

}




function animate(){
	requestAnimationFrame(animate);
	frame++;
	ticker++;
	ctx.save();
	ctx.fillStyle="rgba(0,0,0,0.9)";
	ctx.fillRect(0,0,innerWidth,innerHeight);
	ctx.restore();
	particles.forEach((particle,particleIndex)=>{
		
		particle.update();
	});

	//animate the stars
	stars.forEach((star,starIndex)=>{
		star.update();
	if(star.radius==0){
		stars.splice(starIndex,1);
	}

	});

	//animate the miniStars
	miniStars.forEach((miniStar,miniStarIndex)=>{
	if(miniStar.ttl==0){
		miniStars.splice(miniStarIndex,1);
	}
	miniStar.color=`rgba(255,255,255,${miniStar.opacity})`;
		miniStar.update();
	})

			
//time to spawn the big stars
if(ticker%randomInt==0){
	for(let d=0; d<1; d++){
		let radius=12;
		let x=randomNumber(canvas.width-radius,radius);
		let y=randomNumber(50-radius,radius);
		let color="white";
		stars.push(new Star(x,y,radius,color));

	}
	randomInt=randomNumber(300,75);
}


if(frame%randomFrame==0){
	for(let m=0; m<50; m++){
		let radius=1;
		let color="white";
		let x=randomNumber(canvas.width-radius,radius);
		let y=randomNumber(50-radius,radius);
		particles.push(new Particle(x,y,radius,color));
	}
	randomFrame=randomNumber(100,50);
}
	for(let a=0; a<particles.length; a++){
		for(let b=0; b<a; b++){
			if(getDist(particles[a].x,particles[a].y,particles[b].x,particles[b].y)<100){
				ctx.beginPath();
				ctx.moveTo(particles[a].x,particles[a].y);
				ctx.lineTo(particles[b].x,particles[b].y);
				ctx.lineWidth=0.1;
				ctx.strokeStyle="white";
				ctx.stroke();
				ctx.closePath();
			}
		}
	}

		for(let a=0; a<miniStars.length; a++){
		for(let b=0; b<a; b++){
			if(getDist(miniStars[a].x,miniStars[a].y,miniStars[b].x,miniStars[b].y)<100){
				ctx.beginPath();
				ctx.moveTo(miniStars[a].x,miniStars[a].y);
				ctx.lineTo(miniStars[b].x,miniStars[b].y);
				ctx.lineWidth=0.5;
				ctx.strokeStyle="white";
				ctx.stroke();
				ctx.closePath();
			}
		}
	}

		for(let a=0; a<stars.length; a++){
		for(let b=0; b<a; b++){
			if(getDist(stars[a].x,stars[a].y,stars[b].x,stars[b].y)<500){
				ctx.beginPath();
				ctx.moveTo(stars[a].x,stars[a].y);
				ctx.lineTo(stars[b].x,stars[b].y);
				ctx.lineWidth=1;
				ctx.strokeStyle="white";
				ctx.stroke();
				ctx.closePath();
			}
		}
	}

}



	

init();
animate();

