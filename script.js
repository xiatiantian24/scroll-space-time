
$(document).ready(function(){

  
  var container = $("#container"),
  trans3DBText = $("#trans3DText"), // div containing all tezt
   textContent = $('.text-content'),
  slider = $("#slider"),
  threeDTimeline = gsap.timeline(); //onUpdate allows the slider to stay in sync as animation plays

textContent.html(
  textContent.text().replace(/./g, "<span>$&</span>").replace(/\s/g, "&nbsp;")
);

console.log("test");
gsap.registerPlugin(ScrollTrigger);

gsap.to(textContent, {
  scale: 1,
  x: 0,
  y: 0,
  scrollTrigger: {
    trigger: textContent,
    start: "bottom bottom", 
    end: "bottom top", 
    scrub: true, 
    markers: true, 
    pin: true, 
  },
});

})
