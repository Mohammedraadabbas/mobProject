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
    userProfile = result.additionalUserInfo.profile;
    userProfile.uid = result.user.uid;
    // check if the user is already exist in firebase
    if (result.additionalUserInfo.isNewUser) {
      localStorage.setItem("profile", JSON.stringify(userProfile))
      db.collection('users').doc(userProfile.uid).set(userProfile)
      signInUser(userProfile)
      checkAdmin(userProfile)
    } else {
      db.collection('users').doc(userProfile.uid).get().then(querySnapshot => {
        let profile = querySnapshot.data()
        profile.picture = userProfile.picture
        console.log(profile)
        localStorage.setItem("profile", JSON.stringify(profile))
        console.log(JSON.parse(localStorage.profile))
        signInUser(profile)
        checkAdmin(profile)
        db.collection('users').doc(userProfile.uid).set({ picture: firebase.firestore.FieldValue = userProfile.picture }, { merge: true })
      })
    }
  })
})



// check if the localStorage has the user profile
if (localStorage.profile) {
  let profile = JSON.parse(localStorage.profile);
  userProfile = profile;
  checkAdmin(profile)
  signInUser(profile)
}

// display the user img 
function signInUser(profile) {
  let imgSrc = profile.picture;
  let img = `<img src="${imgSrc}" alt="" />`
  signIn.innerHTML = img
}

// check if the user id matches any admins id in the firebase
function checkAdmin(profile) {
  db.collection('admins').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      if (profile.uid === doc.id) {
        console.log(profile.picture)
        db.collection('admins').doc(profile.uid).set(profile)
        isAdmin = true
        adminPremissions()
      }
    })
  })
}

// form btns
let championshipsContainer = document.querySelector('.championships .container')
let addChampionshipBtn = document.querySelector('.main .championships .add-championships-form-constainer .addChampionshipBtn');
let updateChampionshipBtn = document.querySelector('.main .championships .add-championships-form-constainer .updateChampionshipBtn');
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
      ChampionshipForm.title.value = ""
      ChampionshipForm.participantsNumber.value = 8
      ChampionshipForm.startingDate.value = ""
      ChampionshipForm.deadline.value = ""
      ChampionshipForm.img.value = ""
      ChampionshipForm.color.value = "#000000"
      addChampionshipBtn.style.display = "block"
      updateChampionshipBtn.style.display = "none"
    })
  }
}
// show add Championship btn 
addChampionshipBtn.addEventListener('click', function (e) {
  e.preventDefault()
  addChampionshipToFirebase("", "", false)
})




//add or update Championship To Firebase
let ChampionshipForm = document.querySelector('.main .championships .add-championships-form-constainer form')

function addChampionshipToFirebase(id, players, update) {
  let title = ChampionshipForm.title.value
  let participantsNumber = ChampionshipForm.participantsNumber.value
  let startingDate = ChampionshipForm.startingDate.value
  let deadline = ChampionshipForm.deadline.value
  let color = hexToHSL(ChampionshipForm.color.value)
  let img = ChampionshipForm.img.value

  if (isAdmin) {
    if (update) {
      db.collection('Championships').doc(id).update({
        title,
        participantsNumber,
        startingDate,
        deadline,
        color,
        img,
        round1: players.round1
      })
      console.log('update')
    }
    else {
      db.collection('Championships').doc().set({
        title,
        participantsNumber,
        startingDate,
        deadline,
        color,
        img,
        round1: []
      })
      console.log('add')
    }
    formContainer.classList.remove("adminPremission")
  }
}


// convert the hex color code to hsl and return the hsl code and the hex code
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
  HSL["hex"] = hex;
  return HSL;
}

// get the Championships from firebase
db.collection("Championships").orderBy("deadline", "desc").get().then(querySnapshot => {
  querySnapshot.forEach(doc => {
    showChampionships(doc)
  })

  // animate the card
  var path = document.querySelector('.cardSvg')
  let tl = gsap.timeline({ defaults: { duration: 3 } })
  tl.from(".championship", { opacity: 0, ease: "expo", stagger: .6 })
    .from(".participantImg", {
      opacity: 0, ease: "back", y: 30, stagger: {
        each: .6,
        from: 'random'
      }
    })
  tl.to('.cardSvg', { "stroke-dashoffset": "1000" })
  gsap.from(".firstChild", { ['--progress-width']: "0", duration: 5, ease: "expo", stagger: .6 })
})


// show Championships
function showChampionships(championship) {
  let id = championship.id
  let data = championship.data()
  // color
  let h = data.color.h
  let s = data.color.s
  let l = data.color.l
  // progras bar length
  let progras = (data.round1.length / data.participantsNumber) * 100

  let card = `
  <div class="championship" data-card="${id}"
   style=" --hue : ${Math.round(h * 360)};
  --saturation:${Math.round(s * 100)}%;
  --lightness :${Math.round(l * 100)}%;
  --progress-width :${progras};">
  <div class="deleteCardBtn" data-deleteId="${id}">
    <i class="fa-regular fa-trash-can"></i>
    </div>
  <div class="championship-img">
  <i class="fa-solid fa-crown"></i>
  </div>
  <h2>${data.title}</h2>
  <div data-participants="${id}" class="participants-container">
  </div>
  <div class="championship-progress">
    <span>${Math.floor(progras)}%</span>
    <div class="progress-bar">
      <div class="firstChild"></div>
      <div></div>
    </div>
  </div>
  <button data-bid="${id}" class="join-championship-btn" onclick="animatingBtn(this.dataset.bid)">
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
  <div class="deadline-time" data-time="${id}">
    <div class="date">
      <span class="sec"></span>
      <span class="min"></span>
      <span class="hou"></span>
      <span class="day"></span>
    </div>
    <div class="clock">
      <div class="big-hand"></div>
      <div class="short-hand"></div>
    </div>
  </div>
</div>
  `
  championshipsContainer.insertAdjacentHTML('beforeend', card)
  //show Championship Schedule
  let championshipCard = document.querySelector(`[data-card="${id}"]`)
  championshipCard.addEventListener('click', function () {

  })



  //check if the user if already registered in championship
  let registerBtn = document.querySelector(`.main  [data-bId="${id}"]`)
  if (userProfile) {
    data.round1.forEach(user => {
      if (userProfile.uid === user.uid) {
        registerBtn.classList.add('registered')
      }
    })
  }

  //check if the  championship is full number
  if (data.round1.length == data.participantsNumber) {
    // console.log()
    document.querySelector(`.main  [data-bId="${id}"] span`).innerHTML = "مكتمل"
    registerBtn.setAttribute('disabled', "")
  }

  // add countdown time
  let secCo = document.querySelector(`[data-time="${id}"] .date .sec`)
  let minCo = document.querySelector(`[data-time="${id}"] .date .min`)
  let houCo = document.querySelector(`[data-time="${id}"] .date .hou`)
  let dayCo = document.querySelector(`[data-time="${id}"] .date .day`)

  // let deadline = new Date(data.deadline).getTime()


  let deadline = new Date("Sep 20, 2022 23:59:59").getTime()
  let countdown = setInterval(function () {
    let startingDate = new Date().getTime()
    //The difference between the deadLIne and  starting Date
    let defBtDLandST = deadline - startingDate;

    let day = Math.floor(defBtDLandST / (1000 * 60 * 60 * 24));
    let hou = Math.floor((defBtDLandST % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let min = Math.floor((defBtDLandST % (1000 * 60 * 60)) / (1000 * 60));
    let sec = Math.floor((defBtDLandST % (1000 * 60)) / 1000);

    dayCo.innerHTML = day < 10 ? `:0${day}` : `:${day}`;
    houCo.innerHTML = hou < 10 ? `:0${hou}` : `:${hou}`;
    minCo.innerHTML = min < 10 ? `:0${min}` : `:${min}`;
    secCo.innerHTML = sec < 10 ? `0${sec}` : `${sec}`;

    if (defBtDLandST <= 0) {
      clearInterval(countdown)
      let date = document.querySelector(`[data-card="${id}"] .deadline-time`)
      date.style.display = 'none'
      registerBtn.style.visibility = 'hidden'
    }
  }, 1000)


  // add the participants img to the championship
  let participants = document.querySelector(`[data-participants="${id}"]`)
  if (data.round1) {
    data.round1.forEach(user => {
      let imgSrc = user.picture;
      let img = document.createElement('img')
      img.classList.add("participantImg")
      img.src = imgSrc;
      participants.appendChild(img)
    })
  }



  // admin Premissions 
  let deleteBtn
  if (isAdmin) {
    //show option the championship
    let optionSvg = `
    <svg data-svg="${id}" class="option-svg" width="5" height="22" viewBox="0 0 5 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.2 1.1C2.80751 1.1 3.3 1.59249 3.3 2.2C3.3 2.80751 2.80751 3.3 2.2 3.3C1.59249 3.3 1.1 2.80751 1.1 2.2C1.1 1.59249 1.59249 1.1 2.2 1.1ZM2.2 9.9C2.80751 9.9 3.3 10.3925 3.3 11C3.3 11.6075 2.80751 12.1 2.2 12.1C1.59249 12.1 1.1 11.6075 1.1 11C1.1 10.3925 1.59249 9.9 2.2 9.9ZM2.2 18.7C2.80751 18.7 3.3 19.1925 3.3 19.8C3.3 20.4075 2.80751 20.9 2.2 20.9C1.59249 20.9 1.1 20.4075 1.1 19.8C1.1 19.1925 1.59249 18.7 2.2 18.7Z"
        fill="#C9C9C9"
        stroke="#C9C9C9"
        stroke-width="2.2"
        class="path"
      />
    </svg>`
    championshipCard.insertAdjacentHTML('beforeend', optionSvg)
    let svg = document.querySelector(`[data-svg="${id}"]`)
    // show the form and display the update btn
    svg.addEventListener('click', function () {
      addChampionshipBtn.style.display = "none"
      updateChampionshipBtn.style.display = "block"
      updateChampionship(id, data)
    })
    // show delete icon championship
    deleteBtn = document.querySelector(`[data-deleteId="${id}"]`)
    deleteBtn.style.display = "flex"
    // admin Premissions to delete the championship
    deleteBtn.addEventListener("click", function () {
      deleteChampionship(this.dataset.deleteid)
    })
  }

}

// delete Championship
function deleteChampionship(id) {

  if (isAdmin) {
    let championship = document.querySelector(`[data-card="${id}"]`)
    // delete it from the DOM
    gsap.to(championship, { display: "none", opacity: 0, duration: 2, ease: "power4.inOut" })
    // delete it from the FIREBASE
    db.collection('Championships').doc(id).delete()
  }
}

// update Championship
function updateChampionship(id, data) {
  formContainer.classList.add('adminPremission')
  ChampionshipForm.title.value = data.title
  ChampionshipForm.participantsNumber.value = data.participantsNumber
  ChampionshipForm.startingDate.value = data.startingDate
  ChampionshipForm.deadline.value = data.deadline
  ChampionshipForm.img.value = data.img
  ChampionshipForm.color.value = data.color.hex
  updateChampionshipBtn.addEventListener('click', function (e) {
    e.preventDefault()
    addChampionshipToFirebase(id, data, true)
  })
}


// animating the register button
function animatingBtn(id) {
  let btn = document.querySelector(`.main .championships .championship [data-bId="${id}"]`)
  // to prevent the user from click the button again
  btn.setAttribute('disabled', "")

  if (!btn.classList.contains('registered')) {

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

    }, 500)

    //display the user img on the champions card after the animating is end 
    setTimeout(function () {
      playerRegisterToChamp(id)
      btn.classList.add('registered')
      document.querySelector(`[data-card="${id}"]`)
    }, 4000)

  }

}

// player Register To championship
function playerRegisterToChamp(id) {
  let btn = document.querySelector(`.main .championships .championship [data-bId="${id}"]`)
  let playerImg = userProfile.picture;
  let participants = document.querySelector(`[data-participants="${id}"]`)
  let img = document.createElement('img')
  img.src = playerImg
  // gsap.from(img, { duration: 3, opacity: 0, ease: "expo" })
  gsap.from(img, {
    duration: 3, opacity: 0, ease: "back", y: 30
  })
  participants.appendChild(img)
  // add it to firbase
  let card = db.collection("Championships").doc(id)

  card.set({ round1: firebase.firestore.FieldValue.arrayUnion(userProfile) }, { merge: true })
}


