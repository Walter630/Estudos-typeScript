const express = require('express')
const app = express()

import { Livro } from './models/livro'
import { conexao } from './util/conexao';

app.use(express.json())

app.get('/livros', async (req, res) => {
    

    res.status(200).json(livros); // retorna todos os livros com o status 200 (ok) 
});

app.post('/livros', (req, res) => {
const livro = req.body;
livro.id = crypto.randomUUID().toString() // gera um id único para o livro   ele épara mudar a url pasando o id de uma atividade para outra, ele é por questao de segurança, vantagem de segurança, para não ter que ficar passando o id na url
//desvantagem pesa o banco de dados deixando lento 
//livro.id = livros.length + 1 // gera um id sequencial para o livro, mas não é seguro, pois pode gerar ids duplicados se o servidor for reiniciado ou se houver mais de um servidor rodando


res.status(201).json(livro) // retorna o livro criado com o status 201 (created) 
});

app.put('/livros/:id', async (req, res) => {
const id = req.params.id
const livro = req.body // pega o livro que será atualizado do corpo da requisição
conexao.query('UPDATE livro SET titulo = ?, autor = ?, editora = ?, ano = ? WHERE id = ?', [livro.titulo, livro.autor, livro.editora, livro.ano, id]) // executa a query no banco de dados para atualizar o livro com o id passado na url
res.status(200).json(livro) // retorna o livro atualizado com o status 200 (ok)
});

app.delete('/livros/:id', async (req, res) => {

res.status(204).send() // retorna o status 204 (no content) para indicar que o livro foi deletado com sucesso 
});

app.listen(3000, () => {
    console.log("Rodando...Na porta 3000")
})