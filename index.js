const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
app.use(cors())
app.use(express.json())

//banco de dados em memória
var clientes = []

app.get('/listar', (request, response) => {
  response.json(clientes)
})

app.get('/listar', (request, response) => {
  response.json(clientes)
  .then((clientes) => {
    response.json(JSON.parse(clientes))
  }).catch(() => {
    response.json([])
  })  
})

app.post("/cadastrar", (request, response) => {
    let cliente = request.body
    console.log(cliente)
    clientes.push(cliente) //adiciona o cliente no BD
    response.json({ success: true  })
})

app.delete("/excluir/:cpf", (request, response) => {
  let cpf = request.params.cpf
  for(let i=0; i < clientes.length; i++){
    let cliente = clientes[i]
    if (cliente.cpf == cpf){
        //remove o elemento encontrado na posição "i"
        clientes.splice(i, 1) 
    }
  }
  response.json({ success: true })
})

app.put("/alterar", (request, response) => {
  let cliente = request.body;
//procura o cliente que tem o CPF enviado
  for(let i=0; i < clientes.length; i++){
    if (clientes[i].cpf == cliente.cpf){
      //Substitui os dados do cliente pelos dados enviados pelo front
        clientes[i] = cliente
    }
  }
  response.json({ success: true })
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get("/buscar/:termo", (request, response) => {
  let termoBusca = request.params.termo.toLowerCase(); // Transforma o termo de busca em minúsculas para tornar a busca insensível a maiúsculas e minúsculas

  let resultados = clientes.filter(cliente => {
      // Verifica se o nome do cliente contém o termo de busca
      return cliente.nome.toLowerCase().includes(termoBusca);
  });

  // Ordena os resultados em ordem alfabética pelo nome
  resultados.sort((a, b) => {
      if (a.nome.toLowerCase() < b.nome.toLowerCase()) {
          return -1;
      }
      if (a.nome.toLowerCase() > b.nome.toLowerCase()) {
          return 1;
      }
      return 0;
  });

  response.json(resultados);
});