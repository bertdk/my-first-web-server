const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths form Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weaether",
    name: "Bert",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Helping",
    name: "Bert",
    message: "It is soooo easy",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Bert",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must give me an address",
    });
  }
  const address = req.query.address;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      return res.send({ location, forecastData, address });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.ser) {
    // Cannot set headers after they are sent to the client is because you can only send 1 response back to the client ==> add return
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query.ser);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    error: "Help article not found",
    name: "Bert",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    error: "Page not found",
    name: "Bert",
  });
});

app.listen(port, () => {
  console.log("Server is up on port ", port);
});
