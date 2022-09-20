// firebase

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

let filterOptions = document.querySelector(".filter-options");
let filterIcon = document.querySelector(".fillter-icon");
let addCardIcon = document.querySelector(".add-card-icon");
let startFilteringBtn = document.querySelector(".startfiltering");

const colors = ["#0162FF", "#7e177b", "#00a586", "#af0b0b", "#FE1C6C", "#F61EFF", "#085F63","#FF1178","#2325c5"];


let addCardForm = document.querySelector('.add-card-form')
let updateCardFormcon = document.querySelector('.update-card-form');
let updateCardForm = document.querySelector('.update-card-form form');
let rebortCardFormCon = document.querySelector('.rebort-card-form')
let rebortCardForm = document.querySelector('.rebort-card-form form')
let optionOne = Array.from(
  document.querySelectorAll(
    ".filter-options .option-one input[type = 'checkbox']"
  )
);

let optionTwo = Array.from(
  document.querySelectorAll(
    ".filter-options .option-two input[type = 'checkbox']"
  )
);
let optionThree = Array.from(
  document.querySelectorAll(
    ".filter-options .option-three input[type = 'checkbox']"
  )
);

let isAdmin = false;

// check if the localStorage has the user profile
if (localStorage.profile) {
  let profile = JSON.parse(localStorage.profile);
  userProfile = profile;
  checkAdmin(profile)
}

// check if the user id matches any admins id in the firebase
function checkAdmin(profile) {
  db.collection('admins').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      if (profile.uid === doc.id) {
        db.collection('admins').doc(profile.uid).set(profile)
        isAdmin = true
        addCardIcon.style.display = "flex"
      }
    })
  })
}

//admin Sign In Form
addCardIcon.addEventListener('click', function () {
  addCardIcon.classList.toggle('active');
  if (isAdmin) {
    addCardForm.classList.add('active')
    resetAddCardsForm()
  }
})

function showDelAndUpd() {
  if (isAdmin) {
    document.querySelectorAll('.card .updateCardBtn').forEach(btn => btn.style.display = "flex")
    document.querySelectorAll('.card .deleteCardBtn').forEach(btn => btn.style.display = "flex")
  } else {
    document.querySelectorAll('.card .updateCardBtn').forEach(btn => btn.style.display = "none")
    document.querySelectorAll('.card .deleteCardBtn').forEach(btn => btn.style.display = "none")
  }
}


// remove forms
addEventListener('click', function (e) {
  if (e.target == addCardForm || e.target == updateCardFormcon || e.target == rebortCardFormCon) {
    removesigninform()
  }
})
function removesigninform() {
  addCardIcon.classList.remove("active")
  addCardForm.classList.remove('active')
  updateCardFormcon.classList.remove('active')
  rebortCardFormCon.classList.remove('active')
}

filterIcon.addEventListener("click", function () {
  filterIcon.classList.toggle("active");
  filterOptions.classList.toggle("active");
  changeFillterIcon();
});

//change Fillter Icon
function changeFillterIcon() {
  if (filterIcon.classList.contains("active")) {
    filterIcon.innerHTML = `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.4601 26.5399L26.5399 14.4601" stroke="#303030" stroke-width="2.5625" stroke-linecap="round"/>
        <path d="M14.4601 14.4601L26.5399 26.5399" stroke="#303030" stroke-width="2.5625" stroke-linecap="round"/>
        </svg>
        `;
  } else {
    filterIcon.innerHTML = `<svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.06061 0C4.57406 0 3.33286 1.03758 3.00219 2.42424H0.727273C0.325818 2.42424 0 2.75006 0 3.15152C0 3.55297 0.325818 3.87879 0.727273 3.87879H3.00219C3.33286 5.26545 4.57406 6.30303 6.06061 6.30303C7.7983 6.30303 9.21212 4.88921 9.21212 3.15152C9.21212 1.41382 7.7983 0 6.06061 0ZM6.06061 4.84848C5.12485 4.84848 4.36364 4.08727 4.36364 3.15152C4.36364 2.21576 5.12485 1.45455 6.06061 1.45455C6.99636 1.45455 7.75758 2.21576 7.75758 3.15152C7.75758 4.08727 6.99636 4.84848 6.06061 4.84848ZM11.6364 3.15152C11.6364 2.75006 11.9622 2.42424 12.3636 2.42424H18.1818C18.5833 2.42424 18.9091 2.75006 18.9091 3.15152C18.9091 3.55297 18.5833 3.87879 18.1818 3.87879H12.3636C11.9622 3.87879 11.6364 3.55297 11.6364 3.15152ZM18.1818 12.1212H15.9069C15.5762 10.7345 14.335 9.69697 12.8485 9.69697C11.1108 9.69697 9.69697 11.1108 9.69697 12.8485C9.69697 14.5862 11.1108 16 12.8485 16C14.335 16 15.5762 14.9624 15.9069 13.5758H18.1818C18.5833 13.5758 18.9091 13.2499 18.9091 12.8485C18.9091 12.447 18.5833 12.1212 18.1818 12.1212ZM12.8485 14.5455C11.9127 14.5455 11.1515 13.7842 11.1515 12.8485C11.1515 11.9127 11.9127 11.1515 12.8485 11.1515C13.7842 11.1515 14.5455 11.9127 14.5455 12.8485C14.5455 13.7842 13.7842 14.5455 12.8485 14.5455ZM7.27273 12.8485C7.27273 13.2499 6.94691 13.5758 6.54545 13.5758H0.727273C0.325818 13.5758 0 13.2499 0 12.8485C0 12.447 0.325818 12.1212 0.727273 12.1212H6.54545C6.94691 12.1212 7.27273 12.447 7.27273 12.8485Z" fill="#303030"/>
</svg>`;
  }
}

optionOne.forEach((option) => {
  option.addEventListener("click", function () {
    optionOne.forEach((option) => {
      option.checked = false;
    });
    this.checked = true;
  });
});
optionTwo.forEach((option) => {
  option.addEventListener("click", function () {
    optionTwo.forEach((option) => {
      option.checked = false;
    });
    this.checked = true;
  });
});
optionThree.forEach((option) => {
  option.addEventListener("click", function () {
    optionThree.forEach((option) => {
      option.checked = false;
    });
    this.checked = true;
  });
});

//get the filter option
let arr;
gsap.registerPlugin(Flip)

startFilteringBtn.addEventListener("click", function () {
  arr = [];

  for (i = 0; i < optionOne.length; i++) {
    if (optionOne[i].checked) {
      arr.push(optionOne[i].dataset.option);
    }
  }
  for (i = 0; i < optionTwo.length; i++) {
    if (optionTwo[i].checked) {
      arr.push(optionTwo[i].dataset.option);
    }
  }
  for (i = 0; i < optionThree.length; i++) {
    if (optionThree[i].checked) {
      arr.push(optionThree[i].dataset.option);
    }
  }
  cardsfiltering(arr);
});

//filter the card

function cardsfiltering(options) {
  let cards = Array.from(document.querySelectorAll(".card"));
  const state = Flip.getState(cards)
  cards.forEach((card) => {
    
    if (
      card.classList.contains(options[0]) && (card.classList.contains(options[1]) || card.classList.contains(options[2]))
    ) {
      card.style.display = "flex";

    } else {
      card.style.display = "none";
    }

  });
  Flip.from(state, {
    duration: 0.7,
    scale: true,
    ease: "power1.inOut",
    stagger: 0.08,
    absolute: true,
    onEnter: (elements) => gsap.fromTo(elements, {opacity:0,scale:0}, {opacity:1,scale:1,duration:1}),
    onLeave:(elements) => gsap.to(elements , {opacity:0,scale:0,duration:1}),
  })
  filterIcon.classList.remove('active')
  changeFillterIcon()
  filterOptions.classList.remove('active')
}


// get the card from firebase
let cardsContainer = document.querySelector('.cards-container')
db.collection('cards').orderBy('cardDate',"desc").get().then(querySnapshot => {
  querySnapshot.forEach(doc => {
    showCards(doc)
  })
  let tl = gsap.timeline({ defaults: { duration: 3 } })
  tl.from(".card", { opacity: 0, ease: "expo", stagger: .6 })
})


let id;
// show the card in the page
function showCards(cardInfo) {
  let htmlCard = `
    <div data-card="${cardInfo.id}" id="${cardInfo.id}" class="card ">
    <div class="${cardInfo.id} deleteCardBtn" data-src='${cardInfo.data().filename}' >
    <i class="fa-regular fa-trash-can"></i>
    </div>
    <div class="updateCardBtn" data-id="${cardInfo.id}">
    <i class="fa-regular fa-pen-to-square"></i>
    </div>
    <h4> ${cardInfo.data().title} </h4>
    <div class="categorys">
    </div>
    <div class="option-and-date">
      <div class="options">
      <a class="file-link-btn" href="${cardInfo.data().fileLinkSrc}" data-name='${cardInfo.data().fileLinkSrc}'><i class="fa-solid fa-arrow-right-long"></i></i></a>
        <a class="downloadBtn" downlaod="${cardInfo.data().title}" href="${cardInfo.data().fileSrc}" data-name='${cardInfo.data().fileSrc}' ><i class="fa-solid fa-arrow-down-long"></i></a>
        <div class="rebort-card" data-id="${cardInfo.id}" onclick="rebort(this.dataset.id)"><i class="fa-solid fa-exclamation"></i></div>
      </div>
      <span class="date">منذ <span></span></span>
    </div>
  </div>
    `;


  cardsContainer.insertAdjacentHTML('beforeend', htmlCard)

  let card = document.getElementById(`${cardInfo.id}`)
  let category = document.querySelector(`[data-card="${cardInfo.id}"] .categorys`);

  for (let i = 0; i < cardInfo.data().categorys.length; i++) {
    let color = colors[Math.floor(Math.random() * colors.length)]
    let tag = ` <span style=" background-color:${color}" class="category">${cardInfo.data().categorys[i]}</span>`
    category.insertAdjacentHTML('beforeend', tag)
  }
  for (let i = 0; i < cardInfo.data().clases.length; i++) {
    card.classList.add(cardInfo.data().clases[i])
  }

  // delete card 
  let deleteCardBtns = document.querySelectorAll('.deleteCardBtn');

  let deleteb = document.querySelector(`[data-src="${cardInfo.data().filename}"]`)
  deleteb.addEventListener('click', function () {
    if (isAdmin) {
      if (this.dataset.src != "none") {

        let storageRef = firebase.storage().ref();
        var desertRef = storageRef.child('fils/' + this.dataset.src);

        // Delete the file
        desertRef.delete().then(() => {
          // File deleted successfully
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
      }
    }
  })


  deleteCardBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      if (isAdmin) {
        db.collection('cards').doc(this.classList[0]).delete();
      }
    })
  })
  // update card 
  let updateCardBtns = document.querySelector(`[data-id='${cardInfo.id}']`);

  updateCardBtns.addEventListener('click', function () {
    if (isAdmin) {
      id = cardInfo.id;

      updateCardFormcon.classList.add('active')
      updateCardForm.titleinput.value = cardInfo.data().title;

      updateCardForm.grade.value = cardInfo.data().clases[1];

      updateCardForm.term.value = cardInfo.data().clases[2];

      updateCardForm.category.value = cardInfo.data().clases[0];
    }
  })

  let downloadBtn = document.querySelector(`[data-card="${cardInfo.id}"] .downloadBtn`);
  if (downloadBtn.dataset.name == "display") {
    downloadBtn.style.display = "none"
  }

  let fileLink = document.querySelector(`[data-card="${cardInfo.id}"] .file-link-btn `);
  if (fileLink.dataset.name == "display") {
    fileLink.style.display = "none"
  }


  // set data

  let date = document.querySelector(`[data-card="${cardInfo.id}"] .date span`)
  let cardDate = cardInfo.data().cardDate;
  setInterval(function () {
    let cuurentDate = new Date().getTime()
    //The difference between the cuurentDate and  cardDate
    let defBtCurrAnCard = cuurentDate - cardDate;

    let sec = Math.floor(defBtCurrAnCard / 1000)
    let min = Math.floor(defBtCurrAnCard / 1000 / 60)
    let hou = Math.floor(defBtCurrAnCard / 1000 / 60 / 60)
    let day = Math.floor(defBtCurrAnCard / 1000 / 60 / 60 / 24)
    let mon = Math.floor(defBtCurrAnCard / 1000 / 60 / 60 / 24 / 30)
    let yer = Math.floor(defBtCurrAnCard / 1000 / 60 / 60 / 24 / 30 / 12);
    let yermon = defBtCurrAnCard / 1000 / 60 / 60 / 24 / 30;
    if (sec <= 60) {
      date.innerHTML = `${sec} ثانية`
    } else if (min >= 1 && min <= 60) {
      date.innerHTML = `${min} دقيقة`
    } else if (hou >= 1 && hou <= 24) {
      date.innerHTML = `${hou} ساعة`
    } else if (day >= 1 && day <= 30) {
      date.innerHTML = `${day} يوم`
    } else if (mon >= 1 && mon <= 12) {
      date.innerHTML = `${day} شهر`
    } else if (yer >= 1) {
      date.innerHTML = `${yer} سنة`
    }
  }, 1000)
  showDelAndUpd()
}

// rebort card

function rebort(Id) {
  rebortCardForm.cardId.value = Id;
  rebortCardFormCon.classList.add('active')
}


let downloadBtns = document.querySelectorAll('.downloadBtn')
downloadBtns.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault()
  })
})



// add card to the firebase
let fileinput = document.querySelector('.add-card-form form .file-input');

let file;
let storageRef;
let link;
let fileName;
var time = 0;
let progressBar = document.querySelector('.progress-bar');
fileinput.addEventListener('change', function (e) {
  if (isAdmin) {
    file = e.target.files[0];
    storageRef = firebase.storage().ref('fils/' + file.name);
    fileName = file.name;
    storageRef.put(file).on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      // progressBar.style.setProperty("--width",progress)
      if (progress == 100) {
        upload()
      }
    })
    function upload() {
      let uploadtime = setInterval(function () {
        progressBar.style.setProperty("--width", time)
        if (time >= 50) {
          storageRef.getDownloadURL().then(function (url) {
            link = url
          })
        }
        if (time >= 100) {
          clearInterval(uploadtime)
        } time += 8;
      }, 1000)
    }
  }
})


let fileLink = document.querySelector('.add-card-form form .link')
let addCardBtn = document.querySelector('.add-card-form form button');
let addCardFormRej = document.querySelector('.add-card-form form ');
let fileType = document.querySelector('.add-card-form form #file-type');

fileType.addEventListener('click', function () {
  if (fileType.value != "file") {
    fileLink.style.display = "block"
    document.querySelector('.add-card-form form .file-container').style.display = "none"
    progressBar.style.display = "none"
  } else {
    fileLink.style.display = "none"
    document.querySelector('.add-card-form form .file-container').style.display = "block"
    progressBar.style.display = "block"
  }
})

addCardBtn.addEventListener('click', function (e) {
  if (isAdmin) {
    e.preventDefault()

    if (addCardFormRej.titleinput.value == "") {
      addCardFormRej.titleinput.focus()
      addCardFormRej.titleinput.style.cssText = '  border: 1px solid red;'
    }
    else if (time <= 100 && progressBar.style.display != "none") {
      progressBar.classList.add('wait-boy')
      addCardFormRej.titleinput.style.cssText = 'border: none;'
    }
    else {
      db.collection('cards').add({
        filename: fileName == undefined ? fileName = "none" : fileName = fileName,
        title: addCardFormRej.titleinput.value,

        categorys: [addCardFormRej.category.options[addCardFormRej.category.selectedIndex].text,
        addCardFormRej.grade.options[addCardFormRej.grade.selectedIndex].text,
        addCardFormRej.term.options[addCardFormRej.cardTerm.selectedIndex].text
        ],

        clases: [addCardFormRej.category.value, addCardFormRej.grade.value, addCardFormRej.term.value],
        fileSrc: link == undefined ? link = "display" : link = link,
        fileLinkSrc: addCardFormRej.linkInput.value != "" ? addCardFormRej.linkInput.value : "display",
        cardDate: new Date().getTime()
      })
      addCardForm.classList.remove('active')
      removesigninform()
    }
  }
})
// reset Add Cards Form
function resetAddCardsForm() {
  time = 0;
  addCardFormRej.titleinput.value = "";
  progressBar.style.setProperty("--width", 0)
}



//update card
let updateardFormBtn = document.querySelector(".update-card-form button")
updateardFormBtn.addEventListener('click', function (e) {
  if (isAdmin) {
    e.preventDefault();
    db.collection('cards').doc(id).update({
      title: updateCardForm.titleinput.value,

      categorys: [updateCardForm.category.options[updateCardForm.category.selectedIndex].text,
      updateCardForm.grade.options[updateCardForm.grade.selectedIndex].text,
      updateCardForm.term.options[updateCardForm.term.selectedIndex].text
      ],

      clases: [updateCardForm.category.value, updateCardForm.grade.value, updateCardForm.term.value]
    })
    // removesigninform()
  }
})

// dark mode

let logoImg = document.querySelector('.logo img')


if (!window.localStorage.theam) {
  window.localStorage.theam = "light";
}
mode()

function mode() {
  if (window.localStorage.theam === "dark") {
    document.body.classList.add('mode')
    logoImg.src = "./images/darklogo.svg";
  } else {
    document.body.classList.remove('mode')
    logoImg.src = "./images/logo.svg";
  }
}
