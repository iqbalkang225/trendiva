require("dotenv").config();

const express = require("express");

const app = express();
const path = require("path");
const port = 3000;

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

// const handleRequest = async (api) => {
//   const about = await api.getSingle("about");
//   const home = await api.getSingle("home");
//   const meta = await api.getSingle("meta");
//   const navigation = await api.getSingle("navigation");
//   const preloader = await api.getSingle("preloader");

//   const { results: collectionsData } = await api.query(
//     Prismic.Predicates.at("document.type", "collection"),
//     {
//       fetchLinks: "product.image, product.model",
//     }
//   );

//   const { results: productsData } = await api.query(
//     Prismic.Predicates.at("document.type", "product"),
//     {
//       fetchLinks: "collection.title",
//       pageSize: 100,
//     }
//   );

//   const {
//     data: { list: collectionsOrder },
//   } = await api.getSingle("collections");

//   const collections = collectionsOrder.map(({ collection }) => {
//     const { uid } = collection;
//     const data = find(collectionsData, { uid });

//     return data;
//   });

//   const products = [];

//   collections.forEach((collection) => {
//     collection.data.products.forEach(({ products_product: { uid } }) => {
//       products.push(find(productsData, { uid }));
//     });
//   });

//   const assets = [];

//   home.data.gallery.forEach((item) => {
//     assets.push(item.image.url);
//   });

//   about.data.gallery.forEach((item) => {
//     assets.push(item.image.url);
//   });

//   about.data.body.forEach((section) => {
//     if (section.slice_type === "gallery") {
//       section.items.forEach((item) => {
//         assets.push(item.image.url);
//       });
//     }
//   });

//   collections.forEach((collection) => {
//     collection.data.products.forEach((item) => {
//       assets.push(item.products_product.data.image.url);
//       assets.push(item.products_product.data.model.url);
//     });
//   });

//   return {
//     about,
//     assets,
//     collections,
//     home,
//     meta,
//     navigation,
//     preloader,
//     products,
//   };
// };

app.get("/about", async (req, res) => {
  const api = await initApi(req);

  const about = await api.getSingle("about");

  const { body } = about.data;
  console.log(body);

  if (body.slice_type === "gallery ") {
    console.log("ss");
  }

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
