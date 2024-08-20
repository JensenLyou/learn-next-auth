-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jti" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL,
    "expireDate" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");
