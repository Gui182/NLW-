const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta public
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

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

    //query strings
    

    return res.render("create-point.html")
})


server.post("/savepoint", (req, res) => {
    //req.body
    //inserindo dados
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (
        ?,?,?,?,?,?,?
    );
`
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
     ]

    function afterInsertData(err){
        if(err) {
             console.log(err)
             return res.send("Erro no cadastro!")
        }
        console.log("cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)

   
})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
        return res.render("search-results.html", { total: 0 })
    }

    //pegar um dado da tabela
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err) {
            return console.log(err)
        }

        const total = rows.length
        //mostrar os dados do db na pagina
        console.log(rows)
        return res.render("search-results.html", {places: rows, total})
    })

    
})



//ligar o servidor
server.listen(3000)
