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

// admins check
let isAdmin = false;
let userProfile;

let provider = new firebase.auth.GoogleAuthProvider();
let signIn = document.querySelector('.sign-in');


//user sign in and add the user info to the firebase
signIn.addEventListener('click', function () {
  firebase.auth().signInWithPopup(provider).then((result) => {

    let userProfile = result.additionalUserInfo.profile;
    userProfile.uid = result.user.uid;

    localStorage.setItem("profile", JSON.stringify(userProfile))
    db.collection('users').doc(userProfile.uid).set(userProfile)

    checkAdmin(userProfile.uid)
    signInUser(userProfile)
  })
})


// check if the localStorage has the user profile
if (localStorage.profile) {
  let profile = JSON.parse(localStorage.profile);
  userProfile = profile;
  checkAdmin(profile.uid)
  signInUser(profile)
}

// display the user img 
function signInUser(profile) {
  let imgSrc = profile.picture;
  console.log(imgSrc)
  let img = `<img src="${imgSrc}" alt="" />`
  signIn.innerHTML = img
}

// check if the user id matches any admins id in the firebase
function checkAdmin(userId) {
  db.collection('admins').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      if (userId === doc.id) {
        isAdmin = true
        adminPremissions()
      }
    })
  })
}

let championshipsContainer = document.querySelector('.championships .container')

// admin Premissions
let formContainer = document.querySelector('.main .championships .add-championships-form-constainer')
function adminPremissions() {
  if (isAdmin) {
    // add Championship Premissions
    let addChampionshipTag = document.createElement('div')
    addChampionshipTag.classList.add("add-championship")

    addChampionshipTag.innerHTML = `<i class="fa-solid fa-plus"></i>`
    championshipsContainer.prepend(addChampionshipTag)
    gsap.from(".add-championship", { duration: 3, opacity: 0, ease: "expo" })

    addChampionshipTag.addEventListener('click', function () {
      formContainer.classList.add('adminPremission')
    })
  }
}
// show add Championship Form 

let addChampionshipBtn = document.querySelector('.main .championships .add-championships-form-constainer button');
addChampionshipBtn.addEventListener('click', function (e) {
  e.preventDefault()
  addChampionshipToFirebase()
})


//add Championship ToF irebase
let ChampionshipForm = document.querySelector('.main .championships .add-championships-form-constainer form')

function addChampionshipToFirebase() {
  let title = ChampionshipForm.title.value
  let participantsNumber = ChampionshipForm.participantsNumber.value
  let startingDate = ChampionshipForm.startingDate.value
  let deadline = ChampionshipForm.deadline.value
  let color = hexToHSL(ChampionshipForm.color.value)
  let img = ChampionshipForm.img.value
  if (isAdmin) {
    db.collection('Championships').doc().set({
      title,
      participantsNumber,
      startingDate,
      deadline,
      color,
      img,
    })
  }
  formContainer.classList.remove("adminPremission")
}



function hexToHSL(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  r = parseInt(result[1], 16);
  g = parseInt(result[2], 16);
  b = parseInt(result[3], 16);
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  var HSL = new Object();
  HSL['h'] = h;
  HSL['s'] = s;
  HSL['l'] = l;
  return HSL;
}

// get the Championships from firebase
db.collection('Championships').get().then(querySnapshot => {
  querySnapshot.forEach(doc => {
    showChampionships(doc)
  })
  gsap.from(".championship", { duration: 3, opacity: 0, ease: "expo", stagger: .6, delay: 1 })
  gsap.from(".participantImg", { duration: 3, opacity: 0, ease: "expo", stagger: .6, delay: 2 })
})

// show Championships
function showChampionships(championship) {
  let id = championship.id
  let data = championship.data()
  let h = data.color.h
  let s = data.color.s
  let l = data.color.l
  let card = `
  <div class="championship" id="${id}"
   style=" --hue : ${Math.round(h * 360)};
  --saturation:${Math.round(s * 100)}%;
  --lightness :${Math.round(l * 100)}%;">
  <div class="championship-img">
    <i class="fa-solid fa-crown"></i>
  </div>
  <h2>${data.title}</h2>
  <div data-participants="${id}" class="participants-container">
  </div>
  <div class="championship-progress">
    <span>45%</span>
    <div class="progress-bar">
      <div></div>
      <div></div>
    </div>
  </div>
  <button data-bid="${id}" class="join-championship-btn" onclick="animatingBtn(this.dataset.bid)" >
    <span>تسجيل</span>
    <div></div>
    <svg
      x="0px"
      y="0px"
      fill="none"
      class="checkmark-svg"
      viewBox="0 0 25 30"
    >
      <path d="M2,19.2C5.9,23.6,9.4,28,9.4,28L23,2" />
    </svg>
  </button>
  <div class="deadline-time">
    <span>متبقي دقيقتان</span>

    <svg
      width="13"
      height="13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.72917 2.65625C6.72917 2.36285 6.49132 2.125 6.19792 2.125C5.90452 2.125 5.66667 2.36285 5.66667 2.65625V6.19792C5.66667 6.38109 5.76103 6.55134 5.91635 6.64842L8.04135 7.97654C8.29016 8.13204 8.61791 8.05641 8.77342 7.8076C8.92892 7.5588 8.85328 7.23104 8.60448 7.07554L6.72917 5.90347V2.65625Z"
        fill="#878787"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.19792 0C2.7749 0 0 2.7749 0 6.19792C0 9.62093 2.7749 12.3958 6.19792 12.3958C9.62093 12.3958 12.3958 9.62093 12.3958 6.19792C12.3958 2.7749 9.62093 0 6.19792 0ZM1.0625 6.19792C1.0625 3.3617 3.3617 1.0625 6.19792 1.0625C9.03413 1.0625 11.3333 3.3617 11.3333 6.19792C11.3333 9.03413 9.03413 11.3333 6.19792 11.3333C3.3617 11.3333 1.0625 9.03413 1.0625 6.19792Z"
        fill="#878787"
      />
    </svg>
  </div>
</div>
  `
  championshipsContainer.insertAdjacentHTML('beforeend', card)
  // add the participants img to the championship
  let participants = document.querySelector(`[data-participants="${id}"]`)
  if (data.first) {
    data.first.forEach(user => {
      let imgSrc = user.picture;
      let img = document.createElement('img')
      img.classList.add("participantImg")
      img.src = imgSrc;
      participants.appendChild(img)
    })
  }

}





// animating the button
function animatingBtn(id) {
  let allow = true
  let btn = document.querySelector(`.main .championships .championship [data-bId="${id}"]`)

  if (allow) {
    btn.classList.add('animated')
    let joinChampionshipBtnProgress = document.querySelector(`.main .championships .championship [data-bId="${id}"].animated div`)


    setTimeout(function () {
      let progressCount = 10;
      let progress = setInterval(function () {
        joinChampionshipBtnProgress.style.background = ` conic-gradient(hsla(var(--hue) , var(--saturation), var(--lightness), 1) ${progressCount}deg , #cccccc 0deg)`
        if (progressCount >= 360) {
          clearInterval(progress)
        }
        progressCount += 10
      }, 50)
      allow -= 1;
    }, 500)
  }
  setTimeout(function () { playerRegisterToChamp(id) }, 4000)
}

// player Register To championship
function playerRegisterToChamp(id) {
  let playerImg = userProfile.picture;
  let card = db.collection("Championships").doc(id)
  card.set({ first: firebase.firestore.FieldValue.arrayUnion(userProfile) }, { merge: true })
}
