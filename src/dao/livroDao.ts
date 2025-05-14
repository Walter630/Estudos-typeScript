import { RowDataPacket } from "mysql2";
import { Livro, LivroProps } from "../models/livro";
import { conexao } from "../util/conexao";

export class LivroDao{

    public async salvar(livroProps: LivroProps): Promise<void> {  //ele pega so as propriedades do LivroProps
       
        const sql = 'INSERT INTO livro (id, titulo, autor, editora, ano) VALUES (?, ?, ?, ?, ?)' // sql é a linguagem de consulta do banco de dados, o ? é um placeholder que será substituído pelos valores do livro
        const values = [livroProps.id, livroProps.titulo, livroProps.autor, livroProps.editora, livroProps.ano] // valores que serão inseridos no banco de dados, cada ? é um valor desse array 
        await conexao.query(sql, values) // executa a query no banco de dados

    }

    public async listar(): Promise<Livro[]> {
        const [result] = await conexao.query<LivroProps[] & RowDataPacket[]>('SELECT * FROM livro') //essa promesa tem como dado os livros
    
        const livros: Livro[] = result.map((linha) => {
        const { id, titulo, autor, editora, ano, is_emprestimo} = linha;
        return Livro.build({ id, titulo, autor, editora, ano, is_emprestimo });
    });
    return livros
    }

    public async buscarPorId(id: string): Promise<Livro> {
        const sql = 'SELECT * FROM livro WHERE id = ?'
        const [result] = await conexao.query<LivroProps[] & RowDataPacket[]>(sql, [id])
        const livroBd = result[0] //é o livro encontrado na posicao se ele n achar um livro ele volta null, ele consulta o indece 0 ele tira o vetor do indice 0 do vetor, ele retira do vetor
        //e coloca a variavel
        return Livro.build(livroBd)
    }

    public async deletar(id: string): Promise<void> { //parametro id string, recebe uma promessa do tipo verdadeiro ou falso
         try{
            const [result] = await conexao.query('DELETE FROM livro WHERE id = ?',[id])
         }catch(error){
            throw new Error("Nao foi possivel deletar "+id +error)
         }
    }

    public async atualizar(livroProps: LivroProps): Promise<void> {
        await conexao.query('UPDATE livro SET titulo=?, editora=?, autor=?, ano=? WHERE id = ?', 
            [livroProps.titulo, livroProps.autor, livroProps.editora, livroProps.ano, livroProps.id])
    }

}