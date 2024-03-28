#!/usr/bin/env node

const path = require("path");
const { createRequestHandler } = require("@expo/server/adapter/express");

const express = require("express");
const compression = require("compression");
const morgan = require("morgan");

const CLIENT_BUILD_DIR = path.join(process.cwd(), "dist/client");
const SERVER_BUILD_DIR = path.join(process.cwd(), "dist/server");

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Remove or set to 'development' for local development
// process.env.NODE_ENV = 'production';

app.use(
  express.static(CLIENT_BUILD_DIR, {
    // Remove or reduce maxAge for development
    // maxAge: '1h', // or remove this line
    extensions: ["html"],
  })
);

// Change logging to 'dev' for more verbose output in development
app.use(morgan("dev"));

app.all(
  "*",
  createRequestHandler({
    build: SERVER_BUILD_DIR,
  })
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
