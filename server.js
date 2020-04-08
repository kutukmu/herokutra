const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, resp) => {
  const name = req.body.first;
  const last = req.body.last;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
          LNAME: last,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us19.api.mailchimp.com/3.0/lists/804c7ba3ec";
  const options = {
    method: "POST",
    auth: "kerim:64877b61efabd109d42b42f11686756c-us19",
  };
  const request = https.request(url, options, (res) => {
    if (res.statusCode === 200) {
      resp.sendFile(__dirname + `/success.html`);
    } else {
      resp.sendFile(__dirname + `/failure.html`);
    }

    res.on("data", (data) => {
      console.log(!JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server has started 3000");
});
//804c7ba3ec
//64877b61efabd109d42b42f11686756c-us19
