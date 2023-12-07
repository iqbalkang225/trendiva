import ScrollTrigger from 'gsap/ScrollTrigger';

import LocomotiveScroll from 'locomotive-scroll';

import Page from "classes/Page";


export default class About extends Page {
  constructor() {
    super({
      id: "about",
      element: "#about",
      elements: {
        highlightWrapper: " .highlight__wrapper",
        highlight: " .highlight",
        content: ".about__content",
      },
    });
  }

  // lScroll() {
  //   const locoScroll = new LocomotiveScroll({
  //     el: document.querySelector("[data-scroll-container]"),
  //     smooth: true,
  //     multiplier: 0.3
  //   });
  //   locoScroll.on("scroll", ScrollTrigger.update);

  //   ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  //     scrollTop(value) {
  //       return arguments.length ? locoScroll.scrollTo(value, {duration: 0, disableLerp: true}) : locoScroll.scroll.instance.scroll.y;
  //     }, 
  //     getBoundingClientRect() {
  //       return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  //     },
  //     pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
  //   });

  //   ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  //   ScrollTrigger.refresh();
  // }
}
