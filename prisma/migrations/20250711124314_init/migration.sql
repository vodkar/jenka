-- CreateTable
CREATE TABLE "LocalDatasource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL,
    "datasourceId" INTEGER NOT NULL,
    CONSTRAINT "LocalDatasource_datasourceId_fkey" FOREIGN KEY ("datasourceId") REFERENCES "Datasource" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GithubDatasource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "repository" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "credentialsId" INTEGER NOT NULL,
    "datasourceId" INTEGER NOT NULL,
    CONSTRAINT "GithubDatasource_credentialsId_fkey" FOREIGN KEY ("credentialsId") REFERENCES "GithubCredentials" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GithubDatasource_datasourceId_fkey" FOREIGN KEY ("datasourceId") REFERENCES "Datasource" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "S3Datasource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bucketName" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "credentialsId" INTEGER NOT NULL,
    "datasourceId" INTEGER NOT NULL,
    CONSTRAINT "S3Datasource_credentialsId_fkey" FOREIGN KEY ("credentialsId") REFERENCES "S3Credentials" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "S3Datasource_datasourceId_fkey" FOREIGN KEY ("datasourceId") REFERENCES "Datasource" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GithubCredentials" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "S3Credentials" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accessKeyId" TEXT NOT NULL,
    "secretAccessKey" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "endpointUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "LocalDatasource_datasourceId_key" ON "LocalDatasource"("datasourceId");

-- CreateIndex
CREATE UNIQUE INDEX "GithubDatasource_datasourceId_key" ON "GithubDatasource"("datasourceId");

-- CreateIndex
CREATE UNIQUE INDEX "S3Datasource_datasourceId_key" ON "S3Datasource"("datasourceId");
