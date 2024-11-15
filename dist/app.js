"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db"));
const http_1 = __importDefault(require("http"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const webSocket_1 = require("./sockets/webSocket");
const errorHandler_1 = require("./middleware/errorHandler");
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
const corsOptions = {
    origin: '*',
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
(0, db_1.default)();
app.use('/api', userRoutes_1.default);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
(0, webSocket_1.initializeSocketServer)(io);
app.use(errorHandler_1.errorHandler);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
