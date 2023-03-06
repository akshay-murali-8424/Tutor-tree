"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverConfig = (app) => {
    const startServer = () => {
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on Port ${process.env.PORT}`.bg_blue);
        });
    };
    return {
        startServer
    };
};
exports.default = serverConfig;
