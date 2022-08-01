let menu = document.querySelector(".menu") ,
 navBar = document.querySelector(".navBar") ;

 menu.addEventListener("click",function(){
    menu.classList.toggle("active")
    navBar.classList.toggle("active")
    console.log(menu)
 })