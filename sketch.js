gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let boxes = gsap.utils.toArray(".boxes"),
    checkboxPO = document.querySelector("#checkboxPO"),
    checkboxFSE = document.querySelector("#checkboxFSE");

function setup() {
  ScrollTrigger.getAll().forEach(t => {t.scroll(0); t.kill(true); });

  gsap.set(".box", {
    scale: (i, target) => target.classList.contains("box-1") ? 1 : 0
  });
  boxes.forEach((container, i) => {
    let preventOverlaps = i === 1 && checkboxPO.checked && "group1",
        fastScrollEnd = i === 1 && checkboxFSE.checked,
        box = gsap.utils.toArray(".box", container);
    box.pop();
    box.forEach((el, i) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".move-" + (i + 2),
          start: "top center",
          end: "+=100%",
          toggleActions: "play none none reverse",
          preventOverlaps: preventOverlaps,
          fastScrollEnd: fastScrollEnd
        }
      });
      if (i) {
        tl.fromTo(el, {scale: 0}, {scale: 1, duration: 0.5, immediateRender: false, ease: "back"}, 0);
      }
      tl.fromTo(el, {left: "0%"}, {left: "23.75%", duration: 2, immediateRender: false, ease: "power1.inOut"}, i ? "-=0.25" : 0);
      tl.to(el, {scale: 0.6, backgroundColor: "#555", duration: 0.5, opacity: 0.5, ease: "power1.in"});
    });

  });
}

checkboxPO.addEventListener("change", setup);
checkboxFSE.addEventListener("change", setup);

setup();


// explanation tab
let isOpen;
document.querySelector(".explanation .tab").addEventListener("click", () => {
  isOpen = !isOpen;
  gsap.to(".explanation", {
    top: isOpen ? ((window.innerHeight - 65) / window.innerHeight * -100) + "vh" : "0",
    ease: "power4",
    duration: 0.5
  });
});

// jump links
gsap.utils.toArray(".jumps a").forEach((el, i) => {
  el.addEventListener("click", e => gsap.to(window, {scrollTo: i ? 0 : "max", overwrite: true}) && e.preventDefault());
});

// making the code pretty/formatted.
PR.prettyPrint();