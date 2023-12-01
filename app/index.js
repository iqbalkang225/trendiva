import "../styles/styles.css";

import About from "./pages/About";
import Collections from "./pages/Collections";
import Details from "./pages/Details";
import Home from "./pages/Home";

class App {
  constructor() {
    this.createContent();
    this.createPages();
  }

  createContent() {
    this.content = document.querySelector("#content");
    this.template = this.content.getAttribute("data-template");
  }

  createPages() {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      details: new Details(),
      home: new Home(),
    };

    this.page = this.pages[this.template];
    this.page.create();
  }
}

new App();
