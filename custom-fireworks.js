const firework = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function randomCol(){
        var letter = '0123456789ABCDEF';
        var nums = [];

        for(var i=0; i<3; i++){
        nums[i] = Math.floor(Math.random()*256);
        }

        let brightest = 0;
        for(var i=0; i<3; i++){
        if(brightest<nums[i]) brightest = nums[i];
        }

        brightest /=255;
        for(var i=0; i<3; i++){
        nums[i] /= brightest;
        }

        let color = "#";
        for(var i=0; i<3; i++){
        color += letter[Math.floor(nums[i]/16)];
        color += letter[Math.floor(nums[i]%16)];
        }
        return color;
    }

    class Particle{
        constructor(x, y){
            this.x = x;//Math.random()*canvas.width;
            this.y = y;//Math.random()*canvas.height;
            this.size = Math.random()*0.9 + 0.1;
            this.color = randomCol();
            this.directionX = Math.random()*3 - 1.5;
            this.directionY = Math.random()*3 - 1.5;
        }  

        update(){
            this.x -= this.directionX;
            this.y -= this.directionY;

            if(this.size > 0.01){
                this.size -= 0.009;
            }
        } 

        draw(){
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
            ctx.fill();
        }
    }

    const init = () => {
        const x = Math.random()*canvas.width;
        const y = Math.random()*canvas.height;
        for(let i=0; i<500; i++){
            particles.push(new Particle(x, y));
        }
    }

    const animate = () => {
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        for(let i=0; i < particles.length; i++){
            particles[i].update();
            particles[i].draw();
        }

        particles = particles.filter(particle => particle.size > 0.01)
        
        requestAnimationFrame(animate);
    }

    animate();

    setInterval(() => {
        init();
    }, 1000)

    window.addEventListener('resize',() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    })
}