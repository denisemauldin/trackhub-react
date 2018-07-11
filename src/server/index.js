import express from "express"
import path from "path"
import reactApp from "./app"

const host = process.env.NODE_ENV === "development" ? "localhost" : "localhost"
const server = express()
const serverPort = process.env.NODE_ENV === "development" ? 3000 : 80

// path for static resources
server.use("/assets", express.static("dist/assets"))
// let our app figure the rest of it out
server.use("*", reactApp)
// start the server
server.listen(serverPort, () => console.log(`Listening at http://${host}:${serverPort}`))