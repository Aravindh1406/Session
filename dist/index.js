"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const session_1 = __importDefault(require("./config/session"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
(0, db_1.default)();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(session_1.default);
app.use("/auth", userRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running on port:${port}`);
});
//securepassword
