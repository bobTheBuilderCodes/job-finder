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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5001;
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routers
const auth_1 = __importDefault(require("./routers/auth"));
const users_1 = __importDefault(require("./routers/users"));
const applications_1 = __importDefault(require("./routers/applications"));
const jobs_1 = require("./routers/jobs");
//Visited
app.use("/api/v1", auth_1.default);
app.use("/api/v1", users_1.default);
app.use("/api/v1", jobs_1.jobsRouter);
app.use("/api/v1", applications_1.default);
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Connecting to DB...");
            yield mongoose_1.default.connect(process.env.MONGO_URI);
            console.log("Connected to DB successfully");
            app.listen(PORT, () => console.log(`Server listening on port ${PORT || 5001}...`));
        }
        catch (error) {
            console.log("Error connecting to database", error);
        }
    });
}
startApp();
