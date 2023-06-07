/*
  Warnings:

  - Made the column `expiration` on table `Token` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `Token` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "emailToken" TEXT,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "expiration" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Token" ("createdAt", "expiration", "id", "type", "updatedAt", "userId", "valid") SELECT "createdAt", "expiration", "id", "type", "updatedAt", "userId", "valid" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
CREATE UNIQUE INDEX "Token_type_key" ON "Token"("type");
CREATE UNIQUE INDEX "Token_emailToken_key" ON "Token"("emailToken");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
