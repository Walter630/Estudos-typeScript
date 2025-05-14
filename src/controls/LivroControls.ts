import { LivroDao } from "../dao/livroDao";
import { Livro } from "../models/livro";

export class LivroControls{
    public async salvar(req: Request){
        const {titulo, autor, editora, ano} = req.body;
        const livro = Livro.criar(titulo, autor, editora, ano)
        const livroDao = new LivroDao();
        await livroDao.salvar(livro.getprops())
        return livro.getprops().id
    }
}