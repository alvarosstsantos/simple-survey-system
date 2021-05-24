import "reflect-metadata";

import express from "express";

import createConnection from "@shared/infra/typeorm";

createConnection();

const app = express();

export { app };
