let menu = document.querySelector(".menu") ,
 navBar = document.querySelector(".navBar") ;

 menu.addEventListener("click",function(){
    menu.classList.toggle("active")
    navBar.classList.toggle("active")
    console.log(menu)
 })


const wrapper = document.querySelector('.wrapper');


let pressed = false;
let startX = 0;

wrapper.addEventListener("mousedown", function(e)  {
  pressed = true
  startX= e.clientX;
  this.style.cursor = "grabbing"
  console.log(startX)
})

wrapper.addEventListener("mouseleave", function(e)  {
  pressed = false;
})

window.addEventListener("mouseup", function(e)  {
  pressed = false;
  wrapper.style.cursor = "grab"
})

wrapper.addEventListener("mousemove", function(e)  {
  if(!pressed){
    return;
  }
  this.scrollLeft += startX - e.clientX;
})
