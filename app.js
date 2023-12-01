require("dotenv").config();

const express = require("express");

const app = express();
const path = require("path");
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

const Prismic = require("@prismicio/client");
const PrismicDOM = require("prismic-dom");

const initApi = (req) => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
  });
};

const handleLinkResolver = (doc) => {
  // if (doc.type === 'product') {
  //   return `/detail/${doc.uid}`
  // }

  // if (doc.type === 'collections') {
  //   return '/collections'
  // }

  // if (doc.type === 'about') {
  //   return '/about'
  // }

  return "/";
};

app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT,
    linkResolver: handleLinkResolver,
  };
  res.locals.PrismicDOM = PrismicDOM;

  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", async (req, res) => {
  const api = await initApi(req);
  // const home = await api.getSingle("home");
  const preloader = await api.getSingle("preloader");
  console.log(preloader);

  const { data } = preloader;
  res.render("pages/home", { data });
});

app.get("/collections", async (req, res) => {
  const api = await initApi(req);
  const collection = await api.getSingle("collection");
  console.log(collection);

  const { data } = collection;
  res.render("pages/collections", { data });
});

app.get("/details/:uid", async (req, res) => {
  const api = await initApi(req);
  const product = await api.getByUID("product", req.params.uid);
  console.log(product);
  console.log(product.data.title);

  const { data } = product;
  res.render("pages/details", { data });
});

app.get("/about", async (req, res) => {
  const api = await initApi(req);
  const about = await api.getSingle("about");

  const { body } = about.data;
  res.render("pages/about", { body });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//////////////////////////////////////

//=======================All the routes - these can have their own file/folder========================
// app.get("/", async (req, res) => {
//   const api = await initApi(req);
//   const home = await api.getSingle("home");

//   res.render("pages/home", { home: home.data });
// });

// app.get("/about", async (req, res) => {
//   const api = await initApi(req);
//   const about = await api.getSingle("about");

//   res.render("pages/about", { portfolioItems: about.data.portfolio });
// });
