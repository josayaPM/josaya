/*
  Warnings:

  - You are about to drop the column `professorId` on the `Course` table. All the data in the column will be lost.
  - Added the required column `schoolId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ProfessorCourse" (
    "professorId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("professorId", "courseId"),
    CONSTRAINT "ProfessorCourse_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProfessorCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "schoolId" TEXT NOT NULL,
    CONSTRAINT "Course_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("code", "createdAt", "id", "name") SELECT "code", "createdAt", "id", "name" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE INDEX "Course_schoolId_idx" ON "Course"("schoolId");
CREATE UNIQUE INDEX "Course_schoolId_name_key" ON "Course"("schoolId", "name");
CREATE TABLE "new_Rating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stars" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "firstCreatedAt" DATETIME,
    "userId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rating_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rating_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rating" ("comment", "createdAt", "firstCreatedAt", "id", "professorId", "stars", "updatedAt", "userId") SELECT "comment", "createdAt", "firstCreatedAt", "id", "professorId", "stars", "updatedAt", "userId" FROM "Rating";
DROP TABLE "Rating";
ALTER TABLE "new_Rating" RENAME TO "Rating";
CREATE INDEX "Rating_professorId_idx" ON "Rating"("professorId");
CREATE INDEX "Rating_courseId_idx" ON "Rating"("courseId");
CREATE INDEX "Rating_userId_idx" ON "Rating"("userId");
CREATE UNIQUE INDEX "Rating_userId_professorId_courseId_key" ON "Rating"("userId", "professorId", "courseId");
CREATE TABLE "new_School" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_School" ("id", "name") SELECT "id", "name" FROM "School";
DROP TABLE "School";
ALTER TABLE "new_School" RENAME TO "School";
CREATE UNIQUE INDEX "School_name_key" ON "School"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "ProfessorCourse_courseId_idx" ON "ProfessorCourse"("courseId");
