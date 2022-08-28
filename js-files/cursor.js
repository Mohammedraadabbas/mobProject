let cursorCanvas = document.getElementById("cursor");
let cursorCtx = cursorCanvas.getContext('2d');
cursorCanvas.width = 50;
cursorCanvas.height = 50;







// function Ball(x, y, radius,radians ) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.radians = radians;
//     this.velacity = 0.01
//     this.draw = function () {
//         cursorCtx.beginPath();
//         cursorCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//         cursorCtx.fillStyle = "white"
//         cursorCtx.fill()
//     };

//     this.update = () => {
//         this.radians += this.velacity
//         this.draw();
//         this.x = x +  Math.cos(this.radians) * (cursorCanvas.width / 2  - this.radius) 
//         this.y = y +  Math.sin(this.radians) * (cursorCanvas.height / 2 - this.radius) 
//     };
// }

// let ballss = [];

// ballss.push(new Ball(cursorCanvas.width / 2 , cursorCanvas.height / 2 ,5,0 ))
// ballss.push(new Ball(cursorCanvas.width / 2 , cursorCanvas.height / 2 ,5,3.14  ))
// // Implementation
// // Animation Loop
//  function animate() {
//     requestAnimationFrame(animate);
//     cursorCtx.fillStyle = ("rgb(0,0,0,0.5)")
//     cursorCtx.fillRect(0, 0, innerWidth, innerHeight);
//     ballss.forEach(ball => {
//         ball.update()
//     })
// }





window.addEventListener('load',function(){
    addEventListener('pointermove', function(e){
        cursorCanvas.style.left = e.clientX + "px"
        cursorCanvas.style.top = e.clientY + 'px'
        cursorCanvas.style.opacity = "1";
    })
    // 768 screan size
    if(innerWidth <= 768) {
        addEventListener('pointerdown', function(e){
            cursorCanvas.style.opacity = "1";
        })
        addEventListener('pointerup', function(e){
            cursorCanvas.style.opacity = "0";
        })
        console.log('ok')
    }
})
