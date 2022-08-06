let menu = document.querySelector(".menu"),
  navBar = document.querySelector(".navBar");

menu.addEventListener("click", function () {
  menu.classList.toggle("active");
  navBar.classList.toggle("active");
  console.log(menu);
});

const wrapper = document.querySelector(".wrapper");
let sliders = Array.from(document.querySelectorAll(".slider"));
let slidersLinks = Array.from(document.querySelectorAll(".wrapper .slider a"));
let balls = Array.from(document.querySelectorAll(".wrapper .slider .ball"));

let pressed = false;
let startX = 0;

wrapper.addEventListener("mousedown", function (e) {
  pressed = true;
  startX = e.clientX;
  this.style.cursor = "grabbing";
});

wrapper.addEventListener("mouseleave", function (e) {
  pressed = false;
});

window.addEventListener("mouseup", function (e) {
  pressed = false;
  wrapper.style.cursor = "grab";
});
wrapper.addEventListener("mousemove", function (e) {
  if (!pressed) {
    return;
  }
  this.scrollLeft += startX - e.clientX;
});

let membersCon = document.querySelectorAll(".member-con");
let dots = document.querySelectorAll(".dots .dot");
let memberImgContainer = document.querySelectorAll(".member-img-container");
let memberInfo = document.querySelectorAll(".member-info");
let fade = document.querySelector(".members .container");
console.log(fade)

console.log(memberInfo);

dots.forEach(function (dot, index) {
  dot.addEventListener("click", function () {
    dots.forEach((member) => {
      member.classList.remove("active");
    });
    membersCon.forEach((member) => {
      member.classList.remove("active");
    });
    memberImgContainer.forEach((member) => {
      member.classList.remove("active");
    });
    memberInfo.forEach((member) => {
      member.classList.remove("active");
    });

    
    this.classList.add("active");
    membersCon[index].classList.add("active");
    memberImgContainer[index].classList.add("active");
    memberInfo[index].classList.add("active");
  });
});
