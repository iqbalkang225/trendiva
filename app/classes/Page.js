import each from "lodash/each";
import GSAP from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

import Titles from "animations/Titles";
import Paragraphs from "../animations/Paragraphs";

export default class Page {
  constructor({ id, element, elements }) {
    this.id = id;
    this.selector = element;
    this.selectorChildren = {
      // animationTitles: '[data-animation="title"]',
      ...elements,
    };
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    each(this.selectorChildren, (selector, key) => {
      if (
        selector instanceof window.HTMLElement ||
        selector instanceof window.NodeList ||
        Array.isArray(selector)
      ) {
        this.elements[key] = selector;
      } else {
        this.elements[key] = document.querySelectorAll(selector);
        if (this.elements[key].length === 0) return (this.elements[key] = null);
        if (this.elements[key].length === 1)
          return (this.elements[key] = document.querySelector(selector));
      }
    });
  }

  createAnimations() {
    this.titles = new Titles();
    this.paragraphs = new Paragraphs();
  }

  show() {
    return new Promise((resolve) => {
      GSAP.from(this.element, { autoAlpha: 0, onComplete: resolve });
    });
  }

  hide() {
    return new Promise((resolve) => {
      GSAP.to(this.element, { autoAlpha: 0, onComplete: resolve });
    });
  }

  locoScroll() {
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      multiplier: 0.3,
      smoothMobile: true,
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.querySelector("[data-scroll-container]").style.transform
        ? "transform"
        : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();
  }
}
