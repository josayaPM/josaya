/*
  Warnings:

  - You are about to drop the column `department` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `school` on the `Professor` table. All the data in the column will be lost.
  - Added the required column `departmentId` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    CONSTRAINT "Department_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Professor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "departmentId" TEXT NOT NULL,
    CONSTRAINT "Professor_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Professor" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "Professor";
DROP TABLE "Professor";
ALTER TABLE "new_Professor" RENAME TO "Professor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Department_schoolId_name_key" ON "Department"("schoolId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "School_name_key" ON "School"("name");
