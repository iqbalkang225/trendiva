import LocomotiveScroll from 'locomotive-scroll';

import Page from "classes/Page";

export default class Home extends Page {
  constructor() {
    super({ id: "home", element: "#home" });
  }

  lScroll() {
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
    });
    console.log(locoScroll.el)

    locoScroll.on("scroll", () => console.log('scrolled'));
  }
}
