-- CreateTable
CREATE TABLE "Vault" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vault_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "vaultId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vault_email_key" ON "Vault"("email");

-- CreateIndex
CREATE UNIQUE INDEX "File_path_key" ON "File"("path");

-- CreateIndex
CREATE INDEX "File_vaultId_idx" ON "File"("vaultId");

-- CreateIndex
CREATE INDEX "File_path_idx" ON "File"("path");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_vaultId_fkey" FOREIGN KEY ("vaultId") REFERENCES "Vault"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
