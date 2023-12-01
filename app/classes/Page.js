export default class Page {
  constructor({ id }) {
    this.id = id;
  }

  create() {
    console.log("created", this.id);
  }
}
