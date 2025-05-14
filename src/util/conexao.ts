import mysql from 'mysql2'

export const conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'biblioteca'
}).promise()

