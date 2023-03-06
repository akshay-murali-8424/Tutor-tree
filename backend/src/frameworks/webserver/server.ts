import { Application } from "express";

const serverConfig = (app:Application) => {
    const startServer = () => {
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on Port ${process.env.PORT}`.bg_yellow.bold);
        })
    }
    return {
        startServer
    }
}

export default serverConfig