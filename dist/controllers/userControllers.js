"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.dashboard = exports.login = exports.register = void 0;
const userServices_1 = require("../services/userServices");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const newUser = yield (0, userServices_1.registerUser)(name, email, password);
        res.status(200).json({ message: "User Registered Successfully", User: newUser });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, userServices_1.loginUser)(email, password);
        if (!req.session) {
            throw new Error("Session is not Defined");
        }
        // req.session.user = {
        //     id: user._id.toString(),
        //     // name: user.name,
        //     email: user.email
        // }
        req.session.user = user;
        res.json({ message: "Login Sucessful", user });
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
});
exports.login = login;
const dashboard = (req, res) => {
    if (!req.session.user || !req.session) {
        res.status(403).json({ message: "Unauthorized" });
        return;
    }
    res.status(200).json({ message: "Welcome to Dashboard", user: req.session.user });
};
exports.dashboard = dashboard;
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Error logging out" });
        }
        res.json({ message: "Logout successful" });
    });
};
exports.logout = logout;
