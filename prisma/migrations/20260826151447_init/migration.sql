-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" DECIMAL,
    "avaliacao" REAL,
    "imagemUrl" TEXT NOT NULL,
    "linkAfiliado" TEXT NOT NULL,
    "plataforma" TEXT NOT NULL,
    "categoria" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ATIVO',
    "ultimaChecagem" DATETIME,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ConfiguracaoSite" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "nomeSite" TEXT NOT NULL,
    "logoUrl" TEXT,
    "corPrimaria" TEXT,
    "corSecundaria" TEXT
);

-- CreateIndex
CREATE INDEX "Produto_status_idx" ON "Produto"("status");

-- CreateIndex
CREATE INDEX "Produto_categoria_idx" ON "Produto"("categoria");
