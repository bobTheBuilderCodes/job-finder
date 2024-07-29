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
exports.getUsers = void 0;
const users_1 = require("../models/users");
const index_1 = require("../utils/index");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_1.Users.find({}).select("-password");
    res.status(index_1.OK).json({
        message: "Users fetched successfully.",
        users
    });
});
exports.getUsers = getUsers;
