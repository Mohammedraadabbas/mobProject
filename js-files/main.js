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


//header scrolling
let header = document.querySelector('header')
window.onscroll = function(){
  if(scrollY > 70){
    header.classList.add('active')
    console.log(scrollY)
  }else{
    header.classList.remove('active')
  }
}



// theam mode 
let switcherModeContainer = document.querySelector(".switcher-mode-container");
let innerContainer = document.querySelector(".inner-container");

 function switchIcon() {
  innerContainer.classList.toggle("switch");
  let item1 = document.querySelector(".luminary-item.item1");
  let item2 = document.querySelector(".luminary-item.item2");
  let item3 = document.querySelector(".luminary-item.item3");
  let item4 = document.querySelector(".luminary-item.item4");
  if (window.localStorage.theam === "daek") {
;
  } else {
;
  }
};


  let logo = document.querySelector('.logo')
  let logoImg = document.querySelectorAll('.logo img')
  let memberImg = document.querySelector('#members  img')
  
  mode()
  if(!window.localStorage.theam){
    window.localStorage.theam = "light";
  }
    let item1 = document.querySelector(".luminary-item.item1");
    let item2 = document.querySelector(".luminary-item.item2");
    let item3 = document.querySelector(".luminary-item.item3");
    let item4 = document.querySelector(".luminary-item.item4");
  switcherModeContainer.addEventListener('click' ,function(){
    innerContainer.classList.toggle("switch")
    if(window.localStorage.theam === "light"){
      window.localStorage.theam = 'dark'
    }
    else {
      window.localStorage.theam = "light"
    }
    mode()
  })
  
  function mode(){

    if(window.localStorage.theam === "dark"){
      document.body.classList.add('active')
    innerContainer.classList.add("switch")
     logoImg.forEach(img => img.src="./images/darklogo.svg")
      memberImg.src = "./images/memberdarkimg.svg";
    setTimeout(function () {
      item1.innerHTML = `<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.21619 0.795886C3.11984 0.619471 2.88007 0.61947 2.78372 0.795886L2.10521 2.0383C2.05761 2.12544 1.97535 2.18491 1.88159 2.19996L0.610007 2.40402C0.396437 2.43829 0.321522 2.7248 0.487848 2.87121L1.43512 3.70507C1.52281 3.78226 1.56404 3.90401 1.54274 4.02286L1.29494 5.40548C1.25577 5.62404 1.47172 5.79386 1.65701 5.6902L2.85436 5.02034C2.94549 4.96935 3.05442 4.96935 3.14555 5.02034L4.3429 5.6902C4.52819 5.79386 4.74413 5.62404 4.70496 5.40548L4.45717 4.02286C4.43587 3.90401 4.4771 3.78226 4.56479 3.70507L5.51206 2.87121C5.67838 2.7248 5.60347 2.43829 5.3899 2.40402L4.11832 2.19996C4.02456 2.18491 3.94229 2.12544 3.8947 2.0383L3.21619 0.795886Z" fill="#D9D9D9"/>
          </svg>
          `;
    item2.innerHTML = `<svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.07202 0.265295C1.03991 0.20649 0.959981 0.20649 0.927866 0.265295L0.701695 0.679432C0.685831 0.708481 0.65841 0.728305 0.627155 0.733321L0.203295 0.801341C0.132105 0.812765 0.107133 0.908267 0.162575 0.957071L0.478333 1.23502C0.507561 1.26075 0.521305 1.30134 0.514205 1.34095L0.431607 1.80183C0.41855 1.87468 0.490533 1.93129 0.552295 1.89673L0.951412 1.67345C0.98179 1.65645 1.0181 1.65645 1.04848 1.67345L1.44759 1.89673C1.50936 1.93129 1.58134 1.87468 1.56828 1.80183L1.48568 1.34095C1.47858 1.30134 1.49233 1.26075 1.52155 1.23502L1.83731 0.957071C1.89275 0.908267 1.86778 0.812765 1.79659 0.801341L1.37273 0.733321C1.34148 0.728305 1.31406 0.708481 1.29819 0.679432L1.07202 0.265295Z" fill="#D9D9D9"/>
          </svg>
          `;
    item3.innerHTML = `<svg  width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.00906 0.249761C0.978829 0.194416 0.903605 0.194415 0.873379 0.249761L0.660512 0.639537C0.645581 0.666878 0.619773 0.685535 0.590356 0.690256L0.19143 0.754275C0.124427 0.765027 0.100925 0.854911 0.153105 0.900844L0.450289 1.16245C0.477798 1.18666 0.490733 1.22486 0.484051 1.26215L0.406312 1.69591C0.394023 1.76448 0.461771 1.81775 0.5199 1.78523L0.89554 1.57508C0.924131 1.55908 0.958303 1.55908 0.986894 1.57508L1.36253 1.78523C1.42066 1.81775 1.48841 1.76448 1.47612 1.69591L1.39838 1.26215C1.3917 1.22486 1.40464 1.18666 1.43215 1.16245L1.72933 0.900844C1.78151 0.854911 1.75801 0.765027 1.691 0.754275L1.29208 0.690256C1.26266 0.685535 1.23685 0.666878 1.22192 0.639537L1.00906 0.249761Z" fill="#D9D9D9"/>
          </svg>
          `;
    item4.innerHTML = ` <svg  width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.00906 0.249761C0.978829 0.194416 0.903605 0.194415 0.873379 0.249761L0.660512 0.639537C0.645581 0.666878 0.619773 0.685535 0.590356 0.690256L0.19143 0.754275C0.124427 0.765027 0.100925 0.854911 0.153105 0.900844L0.450289 1.16245C0.477798 1.18666 0.490733 1.22486 0.484051 1.26215L0.406312 1.69591C0.394023 1.76448 0.461771 1.81775 0.5199 1.78523L0.89554 1.57508C0.924131 1.55908 0.958303 1.55908 0.986894 1.57508L1.36253 1.78523C1.42066 1.81775 1.48841 1.76448 1.47612 1.69591L1.39838 1.26215C1.3917 1.22486 1.40464 1.18666 1.43215 1.16245L1.72933 0.900844C1.78151 0.854911 1.75801 0.765027 1.691 0.754275L1.29208 0.690256C1.26266 0.685535 1.23685 0.666878 1.22192 0.639537L1.00906 0.249761Z" fill="#D9D9D9"/>
          </svg>
          `;
  }, 100)
    }else{
      document.body.classList.remove('active')
      innerContainer.classList.remove("switch")
      logoImg.forEach(img => img.src="./images/logo.svg")
      memberImg.src = "./images/member.svg"
      setTimeout(function () {
        item1.innerHTML = `<svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.9999 0.206494C2.203 -0.33493 1.02992 0.222901 1.12719 1.47568C-0.580289 1.87764 -0.208792 4.17576 1.31118 4.17576H2.9999V0.206494Z" fill="#D9D9D9"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.68743 4.17581C5.4105 4.17581 5.99997 3.56759 5.99997 2.82108C5.99997 2.12145 5.51949 1.60346 4.86908 1.47924C4.56321 0.914378 4.11319 0.711637 3.49794 0.813594C3.39131 0.571361 3.22076 0.362723 3.00457 0.210059L2.99988 0.206543V4.17581H4.68743Z" fill="#D9D9D9"/>
        </svg>
        `;
      item2.innerHTML = `<svg width="3" height="2" viewBox="0 0 3 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.43682 0.0989012C1.05514 -0.160416 0.493284 0.106759 0.539872 0.706781C-0.277932 0.899305 -0.100002 2 0.627995 2H1.43682V0.0989012Z" fill="#D9D9D9"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.24491 1.99998C2.59122 1.99998 2.87356 1.70866 2.87356 1.35112C2.87356 1.01603 2.64342 0.767938 2.33191 0.708441C2.18541 0.437898 1.96987 0.340794 1.67519 0.389627C1.62413 0.273608 1.54244 0.17368 1.43889 0.100561L1.43665 0.098877V1.99998H2.24491Z" fill="#D9D9D9"/>
        </svg>
        `;
      item3.innerHTML = `<svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.999968 0.0688313C0.734335 -0.111643 0.343306 0.0743003 0.375729 0.491892C-0.19343 0.62588 -0.0695975 1.39192 0.437059 1.39192H0.999968V0.0688313Z" fill="#D9D9D9"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5624 1.39194C1.80342 1.39194 1.99991 1.1892 1.99991 0.94036C1.99991 0.707149 1.83975 0.534488 1.62294 0.49308C1.52099 0.304793 1.37098 0.237212 1.1659 0.271198C1.13036 0.190454 1.0735 0.120908 1.00144 0.0700196L0.999878 0.0688477V1.39194H1.5624Z" fill="#D9D9D9"/>
        </svg>
        `;
      item4.innerHTML = `<svg width="2" height="2" viewBox="0 0 2 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.999968 0.0688313C0.734335 -0.111643 0.343306 0.0743003 0.375729 0.491892C-0.19343 0.62588 -0.0695975 1.39192 0.437059 1.39192H0.999968V0.0688313Z" fill="#D9D9D9"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5624 1.39194C1.80342 1.39194 1.99991 1.1892 1.99991 0.94036C1.99991 0.707149 1.83975 0.534488 1.62294 0.49308C1.52099 0.304793 1.37098 0.237212 1.1659 0.271198C1.13036 0.190454 1.0735 0.120908 1.00144 0.0700196L0.999878 0.0688477V1.39194H1.5624Z" fill="#D9D9D9"/>
        </svg>
        `;
    }, 100)

    }
  }
