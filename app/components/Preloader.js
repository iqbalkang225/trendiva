import Component from "classes/Component";
import { split } from "../utils/text";

import each from "lodash/each";
import GSAP from "gsap";

export default class Preloader extends Component {
  constructor() {
    super({
      element: "#preloader",
      elements: {
        preloaderText: "#preloader__text",
        preloaderNumber: "#preloader__number",
        images: document.querySelectorAll("img"),
      },
    });

    this.length = 0;

    this.preloadImages();

    split({
      element: this.elements.preloaderText,
      expression: "<br>",
    });

    split({
      element: this.elements.preloaderText,
      expression: "<br>",
    });

    this.elements.titleSpans = document.querySelectorAll("span span");

    console.log(this.elements.preloaderText.innerHTML);
  }

  preloadImages() {
    each(this.elements.images, (element) => {
      element.src = element.getAttribute("data-src");
      element.onload = this.onAssetLoaded.bind(this);
    });
  }

  onAssetLoaded() {
    this.length++;

    const percentLoaded = Math.round(
      (this.length / this.elements.images.length) * 100
    );

    this.elements.preloaderNumber.textContent = percentLoaded + "%";

    if (percentLoaded === 100) this.playAnimation();
  }

  playAnimation() {
    const animateOut = GSAP.timeline({
      delay: 1,
    });

    animateOut
      .to(this.elements.titleSpans, {
        y: 100,
        duration: 1,
        stagger: 0.15,
        ease: "power4.in",
      })
      .to(this.element, { autoAlpha: 0 });

    animateOut.call(() => this.emit("completed"));
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
