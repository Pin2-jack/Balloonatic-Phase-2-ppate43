"use strict";

const express = require("express"),
  app = express(),
  ballonController = require("./controllers/ballonController"),

  layouts = require("express-ejs-layouts");


app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
// app.use(layouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/product_list", ballonController.pro_list);
app.get("/contact", ballonController.contact);
app.get("/about", ballonController.about);
app.get("/login", ballonController.login);
app.get("/register", ballonController.register);
app.post("/register", ballonController.register_post);

app.use(ballonController.pageNotFoundError);
app.use(ballonController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
