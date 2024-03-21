console.clear();
gsap.registerPlugin(ScrollTrigger);

var body = $("body"),
  container = $("#container"),
  trans3DDemo = $("#trans3DDemo"),
  trans3DText = $(".trans3DText"), // div containing text
  z3DText = $("#z3DText"), // div containing text
  textContent = $(".text-content"), //original text div
  textContainer = $(".text-container"),
  level0P = document.querySelectorAll(".level-0 p"),
  level5P = document.querySelectorAll(".level-5 p"),
  level6P = document.querySelectorAll(".level-6 p"),
  level7P = document.querySelectorAll(".level-7 p"),
  level8P = document.querySelectorAll(".level-8 p"),
  level9P = document.querySelectorAll(".level-9 p"),
  level10P = document.querySelectorAll(".level-10 p"),
  level11P = document.querySelectorAll(".level-11 p"),
  level12P = document.querySelectorAll(".level-12 p"),
  level13P = document.querySelectorAll(".level-13 p"),
  level14P = document.querySelectorAll(".level-14 p"),

  slider = $("#slider"),
  loadTimeline = gsap.timeline(),
  skewTimeline = gsap.timeline();
turnTimeline = gsap.timeline();

//scroll trigger markers control
ScrollTrigger.defaults({
  markers: true,
});


//animation on load / refresh
let load = loadTimeline.fromTo(
  ".animation",
  { y: -400 }, { y: 0, duration: 3, ease: "power2.out" }, 0
)
  .fromTo(
    "#trans3DDemo",
    { y: 1000 }, { y: 0, duration: 3, ease: "power2.out" }, 0
  )
  .from(
    "#slider",
    { y: 1000, duration: 3, ease: "power2.out" }, 1
  )
  ;
load.play();
console.log("load");

function displayScrollSpeed() {
  var display = Math.round(scrollSpeed * 10) / 1;
  document.getElementById("scroll-speed-display").innerHTML = "Acceleration <br> <span id='speed-number'>" + display + "</span>";
}


//TODO: play audio based on scroll distance
function playSound(event) {
  // event.preventDefault();
  volume = Math.pow(Math.abs(event.deltaY) * 0.03, 1.5);
  if (Math.abs(event.deltaY) > 0) {
    console.log("play sound on volume " + volume);
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
  }
}

let volume = gsap.utils.clamp(0, 1);
let audio = new Audio('scroll3.wav');
document.body.addEventListener("wheel", playSound, { passive: true });


//randomly select letters from a paragraph
function selectLetters(paragraphs, number) {
  paragraphs.forEach((paragraph) => {
    const textContent = paragraph.textContent;
    let indexes = [];
    while (indexes.length < number) {
      const index = Math.floor(Math.random() * textContent.length);
      if (
        !indexes.includes(index) &&
        textContent[index] !== " " &&
        textContent[index] !== "\n"
      ) {
        indexes.push(index);
      }
    }
    indexes.sort((a, b) => a - b);
    let newTextContent = "";
    let currentIndex = 0;
    indexes.forEach((index) => {
      newTextContent += textContent.substring(currentIndex, index);
      newTextContent += `<div class="animate-z">${textContent[index]}</div>`;
      currentIndex = index + 1;
    });
    newTextContent += textContent.substring(currentIndex);
    paragraph.innerHTML = newTextContent;
  });
}

// selectLetters(level5P, 300);
// selectLetters(level6P, 400);
// selectLetters(level7P, 600);
// selectLetters(level8P, 30);
// selectLetters(level9P, 10);
// selectLetters(level10P, 30);
// selectLetters(level11P, 60);
// selectLetters(level12P, 100);
// selectLetters(level13P, 100);
// selectLetters(level14P, 209);

selectLetters(level5P, 120);
selectLetters(level6P, 200);
selectLetters(level7P, 250);
selectLetters(level8P, 15);
selectLetters(level9P, 1);
selectLetters(level10P,1);
selectLetters(level11P, 1);
selectLetters(level12P, 1);
selectLetters(level13P, 1);
selectLetters(level14P, 100);


// Select all elements with class "animate-z"
var level5L = document.querySelectorAll(".level-5 .animate-z"),
  level6L = document.querySelectorAll(".level-6 .animate-z"),
  level7L = document.querySelectorAll(".level-7 .animate-z"),
  level8L = document.querySelectorAll(".level-8 .animate-z"),
  level9L = document.querySelectorAll(".level-9 .animate-z"),
  level10L = document.querySelectorAll(".level-10 .animate-z"),
  level11L = document.querySelectorAll(".level-11 .animate-z"),
  level12L = document.querySelectorAll(".level-12 .animate-z"),
  level13L = document.querySelectorAll(".level-13 .animate-z"),
  level14L = document.querySelectorAll(".level-14 .animate-z"),
  tail = document.querySelectorAll(".tail .animate-z::after");


//animation 1: skew
let proxy = { skew: 0, rotationY: 0 },
  turn = { rotationZ: 0 },
  ySkewSetter = gsap.quickTo(trans3DText, "skewY", { duration: 0.5, ease: "power3.out" }, "deg"),
  rotationSetter = gsap.quickTo(trans3DText, "rotationY", { duration: 0.5, ease: "power3.out" }, "deg"),
  flipSetter = gsap.quickTo(trans3DText, "rotationY", { duration: 5, ease: "power3.inOut" }, "deg"),
  zSetter = gsap.quickTo(trans3DText, "translateZ", { ease: "power3.out" }),
  turnSetter = gsap.quickTo(level8L, "rotationZ", { duration: 5, ease: "power3.out" }, "deg")
  // bgSetter
  // yClamp = gsap.utils.clamp(-100, 100)
  ;

let scrollSpeed = 0,
  perspective = 1000,
  rotation = 0;

var startTime = Date.now(); // Store the timestamp when the page is loaded

function getElapsedTime() {
  var currentTime = Date.now();
  return currentTime - startTime;
}


ScrollTrigger.create({
  onUpdate: (self) => {
    // var elapsedTime = getElapsedTime();
    // if (elapsedTime % 2 === 0) {
    //   return;
    // } else {
      scrollSpeed = self.getVelocity() / 600;
      displayScrollSpeed();

      perspective = 1000 / Math.sqrt(Math.abs(Math.abs(scrollSpeed) - 2));
      if (
        Math.abs(scrollSpeed) > Math.abs(proxy.skew)
      ) {
        proxy.skew = scrollSpeed * 2;
        proxy.rotationY = -scrollSpeed * 2;
        skewTimeline.to(proxy, {
          skew: 0,
          rotationY: 0,
          duration: 3,
          ease: "power3.out",
          overwrite: true,
          onUpdate: () => {
            ySkewSetter(proxy.skew);
            rotationSetter(proxy.rotationY);
          },
          onStart: () => {
            gsap.set(".trans3DText", {
              transformPerspective: perspective,
              transformStyle: "preserve-3d"
            });
            // console.log(perspective);
          }
        });
        // console.log("skew on speed: " + scrollSpeed);
      };
      if (
        Math.abs(scrollSpeed) > 12
      ) {
        proxy.rotationY = -360;
        perspective = 1000;
        // console.log("rotate on speed: " + scrollSpeed);
      };
    // }
  }
});

// make the right edge "stick" to the scroll bar. force3D: true improves performance
// gsap.set(trans3DText, { transformOrigin: "center center", force3D: true });


//animation 2: z translate
//add label "z" for placement of next group of tweens
// timeline5.add("z"); 
function level5Animation() {
  let timeline5 = gsap.timeline({
    scrollTrigger: {
      trigger: ".level-5",
      start: "-1300 top",
      end: "+=3800",
      toggleActions: "play none play reset",
      id: "z-5",
    }
  });
  level5L.forEach((letter) => {
    var zNum = getRandom(-10, 10);
    timeline5.to(
      letter,
      {
        css: { z: zNum },
        ease: "power2.out",
        duration: 6,
      },
      "<+=0.02"
      // "z"
    );
  });
}

function level6Animation() {
  let timeline6 = gsap.timeline({
    scrollTrigger: {
      trigger: ".level-6",
      start: "-1000 bottom",
      end: "+=4000",
      toggleActions: "play none play reset",
      id: "z-6",
    }
  });
  level6L.forEach((letter) => {
    var zNum = getRandom(-80, 80);
    timeline6.to(
      letter,
      {
        css: { z: zNum },
        ease: "power2.out",
        duration: 6,
      },
      "<+=0.01"
    );
  });
}

function level7Animation() {
  let timeline7 = gsap.timeline({
    scrollTrigger: {
      trigger: ".level-7",
      start: "-1000 bottom",
      end: "+=5600",
      toggleActions: "play reverse play reset",
      id: "z-7",
    }
  });
  level7L.forEach((letter) => {
    var zNum = getRandom(-400, 800);
    timeline7.to(
      letter,
      {
        css: { z: zNum },
        ease: "power2.out",
        duration: 6,
      },
      "<+=0.001"
    );
  });
}

level5Animation();
level6Animation();
level7Animation();


//animation 3: falling
function level8Animation() {
  level8L.forEach((letter) => {
    var rNum = getRandom(0, -100);

    gsap.timeline({
      scrollTrigger: {
        trigger: letter,
        start: "-=500 center",
        end: "+=600",
        toggleActions: "play none reverse none",
        id: "z-8",
        srub: 1,
        ease: "none",
      }
    })
      .to(
        letter,
        {
          rotation: 180,
          opacity: 0,
        },
        0
      );

  });
}

function level9Animation() {
  level9L.forEach((letter) => {
    // var yNum = getRandom(1000, 100);
    var xNum = getRandom(20, -20);
    var rNum = getRandom(90, -90);
    var topNum = getRandom(750, 680);

    gsap.timeline({
      scrollTrigger: {
        trigger: letter,
        start: "-=700 bottom",
        // end: "+=1000",
        // end: () => "+=" + document.letter.offsetWith,
        endTrigger: ".level-9 p",
        end: "bottom bottom",
        toggleActions: "play none reverse none",
        id: "z-9",
        ease: "none",
        scrub: true,
      }
    })
    .to(
      letter,
      {
        position: "sticky",
        top: getRandom(100, 280),
        rotation: getRandom(90, -90),
        // x: getRandom(20, -20),
        // rotation: getRandom(90, -90),
          // y: 100,
      },
    );

    // displayTail(level9P);

    // timeline9.to(
    //   letter,
    //   {
    //     css: {

    //       opacity: 0,
    //     },
    //     ease: "power2.in",
    //     duration: 0.1,
    //   },
    //   ">"
    // );
  });
}

function level10Animation() {
  level10L.forEach((letter) => {

    gsap.timeline({
      scrollTrigger: {
        trigger: letter,
        start: "-=800 center",
        endTrigger: ".level-10 p",
        end: "bottom bottom",
        toggleActions: "play none reverse none",
        id: "z-10",
        ease: "none",
        scrub: true,
      }
    })
    .to(
      letter,
      {
        position: "sticky",
        top: getRandom(100, 280),
        rotation: getRandom(90, -90),
        // x: getRandom(20, -20),
      },
    );

  });
}

function level11Animation() {
  level11L.forEach((letter) => {

    gsap.timeline({
      scrollTrigger: {
        trigger: letter,
        start: "-=800 center",
        endTrigger: ".level-11 p",
        end: "bottom bottom",
        toggleActions: "play none reverse none",
        id: "z-11",
        ease: "none",
        scrub: true,
      }
    })
    .to(
      letter,
      {
        position: "sticky",
        top: getRandom(100, 280),
        rotation: getRandom(90, -90),
        // x: getRandom(20, -20),
      },
    );

  });
}

function level12Animation() {
  level12L.forEach((letter) => {

    gsap.timeline({
      scrollTrigger: {
        trigger: letter,
        start: "-=800 30%",
        endTrigger: ".level-12 p",
        end: "bottom bottom",
        toggleActions: "play none reverse none",
        id: "z-12",
        ease: "none",
      }
    })
    .to(
      letter,
      {
        position: "sticky",
        top: getRandom(100, 280),
        rotation: getRandom(90, -90),
        // x: getRandom(20, -20),
      },
    );

  });
}

function level13Animation() {
  level13L.forEach((letter) => {

    gsap.timeline({
      scrollTrigger: {
        trigger: letter,
        start: "-=800 30%",
        endTrigger: ".level-13 p",
        end: "bottom bottom",
        toggleActions: "play none reverse none",
        id: "z-13",
        ease: "none",
      }
    })
    .to(
      letter,
      {
        position: "sticky",
        top: getRandom(100, 280),
        rotation: getRandom(90, -90),
        // x: getRandom(20, -20),
      },
    );

  });
}


function level14Animation() {

  level14L.forEach((letter) => {
  gsap.timeline({
      scrollTrigger: {
        trigger: level14P,
        start: "top 30%",
        end: "bottom bottom",
        toggleActions: "play none reverse reverse",
        id: "z-14",
        scrub: true,
        ease: "bounce.out",
      }
    })
    .to(
      letter,
      {
          position: "sticky",
          top: getRandom(500, 680),
          rotation: getRandom(0, -90),
          x: getRandom(20, -20),
        // duration: 1,
      },
      "<+=0.01"
    );

    // displayTail(level11P);
  });
}

level8Animation();
level9Animation();
level10Animation();
level11Animation();
level12Animation();
level13Animation();
level14Animation();

//Add to the bottom of the screen
// document.getElementByClass("level-14").innerHTML = "<span>" + letter + "</span>";

function getRandom(max, min) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}

function displayTail(paragraph) {
  // paragraph.addEventListener("wheel", function () {
  paragraph.documentElement.style.setProperty('--width', getRandom(1000, 10));
  // }, { passive: true });
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
