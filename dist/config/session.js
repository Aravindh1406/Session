"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const key = process.env.SECRET_KEY;
console.log(key);
const createSession = (0, express_session_1.default)({
    secret: key,
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.CONNECTION_STRING,
        collectionName: "sessions"
    }),
    cookie: {
        secure: false,
        maxAge: 1000 * 30 * 1
    }
});
exports.default = createSession;
