const express = require('express')
const app = express()

import { LivroControls } from './controls/LivroControls';
import { Request, Response} from 'express';

app.use(express.json())

app.get('/livros', async (req: Request, res: Response) => {
    try{
        const livroControls = new LivroControls()
        const livros = await livroControls.listar(req, res)
        res.status(200).json(livros); // retorna todos os livros com o status 200 (ok) 
    }catch{
        res.status(500).json({ mensagem: 'Erro ao buscar livros' })
    }
});

app.post('/livros', (req: Request, res: Response) => {
    const livroControls = new LivroControls();
    const id = livroControls.salvar(req)
    res.status(200).json(id)
});

app.get('/livros/:id', async (req: Request, res: Response) => {
    const livroControls = new LivroControls();
    const livros = await livroControls.buscarPorId(req)
    res.status(200).json(livros)
});

app.put('/livros/:id', async (req: Request, res: Response)=>{
    const livroControls = new LivroControls()
    const livros = await livroControls.atualizar(req)
    res.status(200).json(livros)
})

app.delete('/livros/:id', async (req: Request, res: Response) => {
    const livroControls = new LivroControls();
    const livros = await livroControls.deletar(req)
    res.status(200).json(livros)

    // retorna o status 204 (no content) para indicar que o livro foi deletado com sucesso 
});

app.listen(3000, () => {
    console.log("Rodando...Na porta 3000")
})