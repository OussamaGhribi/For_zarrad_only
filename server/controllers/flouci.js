const axios = require("axios");
const dotenv = require("dotenv");
const Order = require("../models/Order");

let totalEarnings = 0; 
dotenv.config();

module.exports = {
  
  Add: async (req, res) => {
    const url = "https://developers.flouci.com/api/generate_payment";
    const payload = {
      "app_token": "966c173c-a448-4bcf-b739-4c2b1520c764" || process.env.app_token,
      "app_secret": "728ba4ba-9436-4c66-a94a-f2dbb2392993" || process.env.app_secret,
      "accept_card": "true",
      "amount": req.body.amount,
      "success_link": "http://localhost:5173/success",
      "fail_link": "http://localhost:5173/fail",
      "session_timeout_secs": 3600,
      "developer_tracking_id": "7651058a-f999-4741-a542-8bf6764eb1b2",
    };

    try {
      const result = await axios.post(url, payload);
      totalEarnings += req.body.amount;


      res.send({
        ...result.data,
        totalEarnings: totalEarnings,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Payment initiation failed" });
    }
  },

  Verify: async (req, res) => {
    const payment_id = req.params.id;
    try {
      const result = await axios.get(
        `https://developers.flouci.com/api/verify_payment/${payment_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'apppublic': '966c173c-a448-4bcf-b739-4c2b1520c764',
            'appsecret': '728ba4ba-9436-4c66-a94a-f2dbb2392993',
          },
        }
      );
      res.send(result.data);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ error: "Verification failed" });
    }
  },

  GetEarnings: (req, res) => {
    res.json({ earnings: totalEarnings });
  },
};
