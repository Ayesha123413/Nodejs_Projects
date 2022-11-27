import express from "express";
import bodyParser from "body-parser";
import * as stripe from "./stripe.js";
import session from "express-session";
import memorystore from "memorystore";

const memoryStore = memorystore(session);

/*product of membership created in stripe account to check 
which membership is selected by user in post(/checkout')
within if condition*/
const products = {
  basic: "price_1M5nchGP5UTaUYFN3HBAefFh",
  pro: "price_1M5nftGP5UTaUYFN2J10Ne9K",
};

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("Public"));
//ejs is fro developing frontend
app.set("view engine", "ejs");

app.use(
  session({
    saveUninitialized: false,
    cookie: { maxAge: 84600000 }, //it is = to 24hrs
    store: new memoryStore({
      checkPeriod: 84600000,
    }),
    resave: "false",
    secret: "tis is secret",
  })
);

app.get("/", (req, res) => {
  //login inside render method is basically the login.ejs file , we'va created in views folder
  console.log("this is get method");
  res.render("login");
  console.log("get is running");
});

//add customer's email to stripe acount
app.post("/login", async (req, res) => {
  console.log("this is post method");
  const { email } = req.body;
  const customer = await stripe.addNewCustomer(email);
  console.log(customer);
  console.log("this is session", req.session);
  req.session.customerID = customer;
  req.session.email = email;
  console.log(session);

  // redirect user to account page
  res.redirect("accounts");
  console.log("this is after redirect");
});

app.get("/accounts", (req, res) => {
  console.log("this is accounts get");
  res.render("accounts");
});

app.post("/checkout", async (req, res) => {
  console.log("checkout is running in post");
  console.log("this is product in checkout in post ", req.body.product);
  let product = "";
  if (req.body.product == "BASIC") {
    product = products.basic;
  } else {
    product = products.pro;
  }
  console.log("product after if ", product);
  const { customer } = req.session;
  //this method is created in stripe.js
  const session = await stripe.createCheckoutSession(customer, product);
  console.log("SESSION IN CHECKOUT", session);
  res.send({ sessionId: session.id });
});
//when payment gets successfull
app.get("/success", (req, res) => {
  res.send("payment successfull");
});

//when payment gets failed
app.get("/failed", (req, res) => {
  res.send("payment failed");
});
app.listen(port, () => {
  console.log("we are listening  port " + port);
});
