const express = require("express");
const accountsRouter = require("../api/routers/accounts-router");

const server = express();

server.use(express.json());
server.use(accountsRouter);

module.exports = server;
