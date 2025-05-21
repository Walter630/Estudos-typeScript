import { DaoFactory } from "../dao/DaoFactory";
import { Livro } from "../models/livro";
import { Request, Response} from 'express';

export class LivroControls{
    public async salvar(req: Request){
        try{

            const {titulo, autor, editora, ano} = req.body;
            
            const livro = Livro.criar(titulo, autor, editora, ano)
            console.log('Ta chegando',livro)
            await DaoFactory.livroDao.salvar(livro.getprops())
        }catch(err){
            throw new Error('Erro ao cadastrar livro'+ err)
        }
    }

    public async listar(req: Request, res: Response){
        try{
            const livros = await DaoFactory.livroDao.listar()
            res.status(201).json(livros)
        }catch(err){
            throw new Error('akd'+err)
        }
    }

    public async buscarPorId(req: Request){
        try{
            const {id} = req.params;
            const livro = await DaoFactory.livroDao.buscarPorId( id );
            return livro
        }catch(err){
            throw new Error('akd'+err)
        }
    }

    public async deletar(req: Request){
        try{
            const {id} = req.params;
            await DaoFactory.livroDao.deletar(id);
            return {message: 'Livro deletado com sucesso.'};
        }catch(err){
            throw new Error('Nao foi possivel deletar livro'+err)
        }
    }

    public async atualizar(req: Request){
        try{
            const {id} = req.params
            const {titulo, autor, editora, ano, is_emprestimo} = req.body
            await DaoFactory.livroDao.atualizar({ id, titulo, autor, editora, ano, is_emprestimo})
            return {message: 'Livro atualizado com suceso com sucesso.'};
        }catch(err){
            throw new Error('Nao foi possivel atualizar livro'+ err)
        }
    }
}       