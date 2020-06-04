const express = require("express")
const server = express()

//configurar pasta public
server.use(express.static("public"))

//configurar camionho para minha app
//pagina inicial

//utilizando template engine
const nunjucks = require("nunjucks")

nunjucks.configure("src/views", {
    express:server,
    noCache:true
})

server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um Titulo"})
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})



//ligar o servidor
server.listen(3000)
