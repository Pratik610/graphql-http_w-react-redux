import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import { createHandler } from "graphql-http/lib/use/express";
import bodyParser from "body-parser";
import Schema from "./graphql-schema/schema.js";
import { authenticateJWT } from "./config/auth.js";
import path from "path";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
// initializing the variables
const app = express();
dotenv.config();

//connect the Database
connectDB();

// middlewares
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.json());

// auth middleware
app.use(authenticateJWT);

//setting up graphql api
app.use(
  "/graphql",
  createHandler({
    schema: Schema, // adding app schema
    context: (req) => {
      return { user: req.raw.user }; // adding context for auth operations
    },
  })
);

// listening to port
app.listen(
  process.env.PORT,
  console.log(`Server Running on Port ${process.env.PORT}`)
);
