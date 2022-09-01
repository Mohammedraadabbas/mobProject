// firebase setup
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDOjjM-2EHiTugZcDsqF2HHYi2jmEMOfXE",
  authDomain: "auth-sign-fa46c.firebaseapp.com",
  databaseURL: "https://auth-sign-fa46c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "auth-sign-fa46c",
  storageBucket: "auth-sign-fa46c.appspot.com",
  messagingSenderId: "332168946934",
  appId: "1:332168946934:web:ce66d078702b2850d4f8d7",
  measurementId: "G-579KE8X1YZ"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();


let  provider = new firebase.auth.GoogleAuthProvider();
let signIn = document.querySelector('.sign-in');

signIn.addEventListener('click', function(){
  firebase.auth().signInWithPopup(provider).then((result) => {
    // img.src=`${result.additionalUserInfo.user.photoURL}`
    console.log(result)
    let userProfile = result.additionalUserInfo.profile;
    userProfile.uid = result.user.uid;
    localStorage.setItem("profile" , JSON.stringify(userProfile))
    db.collection('users').doc(userProfile.uid).set(userProfile)
    signInUser()
  })
})
console.log(JSON.parse(localStorage.profile))
signInUser()


function signInUser(){
  if(localStorage.profile){
  let userInfo = JSON.parse(localStorage.profile)
  let imgSrc = userInfo.picture;
  console.log(imgSrc)
  let img = `<img src="${imgSrc}" alt="" />`
  signIn.innerHTML = img}
}







let joinChampionshipBtns = Array.from(document.querySelectorAll('.join-championship-btn'))

let allow = true
joinChampionshipBtns.forEach(function(btn) {
btn.addEventListener('click',function(){
  btn.classList.add('animated')
  let joinChampionshipBtnProgress = document.querySelector(`.${this.classList[0]}.animated div`)
  
  if(allow){
  setTimeout(function() {
    let progressCount = 10;
    let progress = setInterval(function(){
      joinChampionshipBtnProgress.style.background =` conic-gradient(hsla(var(--hue) , var(--saturation), var(--lightness), 1) ${progressCount}deg , #cccccc 0deg)`
      if(progressCount >= 360){
        clearInterval(progress)
      }
      console.log(progressCount)
      progressCount+=10
    },50)
    allow -=1 ;
    
  },500)}
})
})
