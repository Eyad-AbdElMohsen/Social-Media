"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const notFound_middleware_1 = __importDefault(require("./middlewares/notFound.middleware"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const friend_route_1 = __importDefault(require("./routes/friend.route"));
const cors_1 = __importDefault(require("cors"));
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(user_route_1.default);
app.use(post_route_1.default);
app.use(friend_route_1.default);
// glopal middleware
app.all('*', notFound_middleware_1.default);
//err handler
app.use(error_middleware_1.default);
app.listen(port, () => {
    console.log("running on port: " + port);
});
