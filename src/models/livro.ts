export type LivroProps = {
    id: string;
    titulo: string;
    autor: string;
    editora: string;
    ano: number;
    is_emprestimo: boolean;
}
//props sao os atributos ele cria um atributo
export class Livro {
    private constructor(private props: LivroProps){}
        public static criar(titulo: string, autor: string, editora: string, ano: number): Livro {

            if(!titulo || !autor || !editora || !ano) {
                throw new Error('Todos os campo sao obrigatorio')
            }

            const livro = new Livro({
                id: crypto.randomUUID().toString(),
                titulo,
                autor,
                editora,
                ano,
                is_emprestimo: false
            })
        return livro
        }

        public static build(livroProps: LivroProps): Livro {  //livro precisa existirpra motrar isso
            return new Livro(livroProps)
        }
}