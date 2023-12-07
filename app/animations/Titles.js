import GSAP from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from 'locomotive-scroll';
import each from 'lodash/each'

import { split } from "utils/text";

GSAP.registerPlugin(ScrollTrigger)

import Component from "classes/Component";

export default class Titles extends Component {
  constructor() {
    super({
        elements: {
          titles: '[data-animation="title"]',
        }
      })

    this.splitText();
    this.attachAnimations();

  }

  attachAnimations() {
    each(this.elements.titles, title => {
      const titleSpans = title.querySelectorAll('span')
      this.animation(titleSpans, title)
    })
  }

  lScroll() {
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      multiplier: 0.3
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, {duration: 0, disableLerp: true}) : locoScroll.scroll.instance.scroll.y;
      }, 
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();
  }

  animation(spans, title) {
    this.lScroll()
    GSAP.from(spans, { y: 100, autoAlpha: 0, stagger: 0.05, scrollTrigger: { trigger: title, start: 'top 60%', toggleActions: "restart none none reverse", markers:true, scroller: "[data-scroll-container]"}})
  }

  splitText() {
    each(this.elements.titles, title => {
      split({element: title, expression: '<br>'})
    })

    each(this.elements.titles, title => {
      split({element: title, expression: '<br>'})
    })
  }
}