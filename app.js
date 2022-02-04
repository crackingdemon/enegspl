// rzp_test_3wNdrQGujnrR49
// L51h76Ef0a4Y439FvlCK9qSZ

let express = require("express");
const dotenv = require("dotenv");
// const dotenv = require("dotenv");
const cors = require("cors");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const ejs = require("ejs");
const shortid = require("shortid");
require("dotenv").config();

dotenv.config();

// dotenv.config();
let app = express();

const instance = new Razorpay({
  key_id: "rzp_live_fXlQdaaaEiPXWx",
  key_secret: "at2bvtbPZriJmTXv2kA3hHot",
});

//MIM
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.set("view engine", "ejs");

//routes
// app.get("/payments", (req, res) => {
//   res.render("payment", { key: "rzp_test_3wNdrQGujnrR49" });
// });
app.get("/", (req, res) => {
  res.render("home", { key: "rzp_test_3wNdrQGujnrR49" });
});
app.post("/razorpay", async (req, res) => {
  try {
    console.log(req.body);
    const { amount } = req.body;
    const payment_capture = 1;
    const currency = "INR";
    const options = {
      amount: amount * 100,
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };
    const response = await instance.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});





function c02_cal(carbon_det){
  let data={
    "Scooter":{
      "less than 150cc":{
        "petrol":0.0378
      }
    },
    "Motorcycle":{
      "less than 200cc":{
        "petrol":0.0373
      },
      "more than 200cc":{
        "petrol":0.0596
      }
    },
    "Hatchback":{
      "less than 1000cc":{
          "petrol":0.119,
          "cng":0.068,
          "diesel":0.113
      },
      "more than 1000cc":{
          "petrol":0.151,
          "cng":0.086,
          "diesel":0.137       
      }
    },
    "Sedan":{
      "less than 2000cc":{
          "petrol":0.153,
          "diesel":0.136
      },
      "more than 2000cc":{
          "petrol":0.169,
          "diesel":0.160
      },
      "premium":{
          "petrol":0.229,
          "diesel":0.196
      }
    },
    "Suv":{
      "less than 2000cc":{
          "petrol":0.203,
          "diesel":0.201
      },
      "more than 2000cc":{
          "petrol":0.222,
          "diesel":0.215
      },
      "premium":{
          "petrol":0.259,
          "diesel":0.231
      }
    }
  }

  return data[carbon_set.classification][carbon_det.category][carbon_det.fuel];
}




app.post("/api/payment/verify", (req, res) => {
  body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", "at2bvtbPZriJmTXv2kA3hHot")
    .update(body.toString())
    .digest("hex");
  console.log("sig" + req.body.razorpay_signature);
  console.log("sig" + expectedSignature);
  var response = { status: "failure" };
  if (expectedSignature === req.body.razorpay_signature)
    response = { status: "success" };
  res.send(response);
});
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
//just example
