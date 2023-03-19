import { Application } from "express";
import configKeys from "../../config";

const serverConfig = (app:Application) => {
    const startServer = () => {
        app.listen(configKeys.port, () => {
            console.log(`Server listening on Port ${configKeys.port}`.bg_yellow.bold);
        })
    }
    return {
        startServer
    }
}

export default serverConfig