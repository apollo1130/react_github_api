const express = require("express");
const bodyParser = require("body-parser");
const FormData = require("form-data");
const fetch = require("node-fetch");
// const { client_id, redirect_uri, client_secret } = require("./config");

// const config = require("./config");

const app = express();
let client_id = '';
let client_secret = '';
let token='';
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/authenticate", (req, res) => {
  const { code } = req.body;

  const data = new FormData();
  data.append("client_id", client_id);
  data.append("client_secret", client_secret);
  data.append("code", code);
  data.append("redirect_uri", "http://localhost:3000/login");
  // Request to exchange code for an access token
  fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      let params = new URLSearchParams(paramsString);
      const access_token = params.get("access_token");
      token = access_token;
      // Request to return data of a user that has been authenticated
      return fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
    })
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json({user: response, token: token});
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});
app.post('/clientinfo', (req, res) => {
  client_id = req.body.client_id;
  client_secret = req.body.client_secret;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({"success":1, "url":`https://github.com/login/oauth/authorize?scope=repo&client_id=${client_id}&redirect_uri=http://localhost:3000/login`});
});

app.get("/getToken", (req, res) => {
  res.json({'token': token});
})

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
