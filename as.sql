CREATE TABLE biblioteca.livro (
	id varchar(36) NOT NULL,
	titulo varchar(100) NOT NULL,
	editora varchar(100) NULL,
	ano INT NULL,
	CONSTRAINT livro_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
