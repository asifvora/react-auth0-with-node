const express = require("express");
const cors = require("cors");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const axios = require("axios");
const helmet = require('helmet');
const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const PORT = process.env.PORT || 4000;
const AUDIENCE = process.env.AUDIENCE;
const ISSUER = process.env.ISSUER;
const JWKS_URI = process.env.JWKS_URI;
const ALGO = process.env.ACCESS_TOKEN_ALGO;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

const verifiyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: JWKS_URI,
  }),
  audience: AUDIENCE,
  issuer: ISSUER,
  algorithms: [ALGO],
}).unless({
  path: ["/"],
});

app.use(verifiyJwt);

app.get("/", (req, res) => {
  res.status(200).json({
    message: 'Hello from index route',
  });
});

app.get("/protected", async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const { data } = await axios.get(`${ISSUER}userinfo`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.status(200).json({
      userInfo: data
    });
  } catch (error) {
    res.send(error.message);
  }
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error)
  const status = error.status || 500;
  const message = error.message || "Internal server error";

  res.status(status).json({
    message
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

module.exports = app;
