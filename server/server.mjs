import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import initDB from "../db/init.js";
import { typeDefs, resolvers } from "../schema/schema.js";

const app = express();
const httpServer = http.createServer(app);
const PORT = 3000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

await mongoose
  .connect("mongodb://mongo:27017/test-shop")
  .then(() => {
    console.log("Connected to DB!");
    initDB();
  })
  .catch((err) => console.error(err));
  

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://127.0.0.1:${PORT}`);
