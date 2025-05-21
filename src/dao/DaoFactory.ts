import { LivroDao } from "./livroDao";

export class DaoFactory{
    public static get livroDao(){
        return new LivroDao();
    }
}   