import "../styles/styles.css";

import About from "./pages/About";
import Collections from "./pages/Collections";
import Details from "./pages/Details";
import Home from "./pages/Home";

import each from "lodash/each";

class App {
  constructor() {
    this.createContent();
    this.createPages();

    this.addLinkListeners();
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
    this.page.show();
  }

  async onChange(url) {
    await this.page.hide();

    const response = await window.fetch(url);

    if (response.status !== 200) return;

    const html = await response.text();

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const content = tempDiv.querySelector(".content");
    this.template = content.getAttribute("data-template");

    this.content.setAttribute("data-template", this.template);

    this.content.innerHTML = content.innerHTML;

    this.page = this.pages[this.template];
    this.page.create();
    this.page.show();
  }

  addLinkListeners() {
    const links = document.querySelectorAll("a");

    each(links, (link) => {
      link.onclick = (event) => {
        event.preventDefault();

        this.onChange(link.href);
      };
    });
  }
}

new App();
