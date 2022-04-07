import express, { json, Application, Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import schema from "./graphql/schemaMap";
import { checkAuth } from "./middleware/auth";
import DBconnection from './config/DB';

config();
DBconnection();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(json());
app.use(cors());
app.use(checkAuth);

app.get("/", (req: Request, res: Response) => res.status(200).json({ status: true, code: 200, version: 2.0, message: "market service is live" }))

const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => req,
    formatError: error => ({ message: error.message })
});

apolloServer.applyMiddleware({ app, path: '/api' });

app.listen(PORT, () => console.log(`App is running on localhost:${PORT}${apolloServer.graphqlPath}`));
