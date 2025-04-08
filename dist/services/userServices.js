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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usermodel_1 = __importDefault(require("../models/usermodel"));
const registerUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield usermodel_1.default.findOne({ email });
    if (existingUser) {
        throw new Error("User already Exists");
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    console.log(salt);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const newUser = yield usermodel_1.default.create({ name, email, password: hashedPassword });
    newUser.save();
    return newUser;
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usermodel_1.default.findOne({ email });
    if (!user) {
        throw new Error("Invalid Credentials");
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid Credentials");
    }
    return user;
});
exports.loginUser = loginUser;
