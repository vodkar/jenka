-- CreateTable
CREATE TABLE "Worker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LocalWorker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "containerId" TEXT NOT NULL,
    "containerName" TEXT NOT NULL,
    "workerId" INTEGER NOT NULL,
    CONSTRAINT "LocalWorker_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RemoteWorker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "workerId" INTEGER NOT NULL,
    CONSTRAINT "RemoteWorker_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Datasource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "datasourceId" INTEGER NOT NULL,
    CONSTRAINT "Project_datasourceId_fkey" FOREIGN KEY ("datasourceId") REFERENCES "Datasource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TaskParameter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "defaultValue" TEXT,
    "isRequired" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL,
    CONSTRAINT "TaskParameter_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TaskParameterEnum" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "enumValues" TEXT NOT NULL,
    "parameterId" INTEGER NOT NULL,
    CONSTRAINT "TaskParameterEnum_parameterId_fkey" FOREIGN KEY ("parameterId") REFERENCES "TaskParameter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TaskParameterCustom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userDefinedType" TEXT NOT NULL,
    "parameterId" INTEGER NOT NULL,
    CONSTRAINT "TaskParameterCustom_parameterId_fkey" FOREIGN KEY ("parameterId") REFERENCES "TaskParameter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TaskRun" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "runNumber" INTEGER NOT NULL,
    "output" TEXT,
    "status" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "finishedAt" DATETIME,
    "taskfileId" INTEGER NOT NULL,
    "hasOutput" BOOLEAN NOT NULL DEFAULT false,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "parameters" TEXT,
    "taskId" INTEGER NOT NULL,
    "workerId" INTEGER,
    CONSTRAINT "TaskRun_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TaskRun_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "LocalWorker_workerId_key" ON "LocalWorker"("workerId");

-- CreateIndex
CREATE UNIQUE INDEX "RemoteWorker_workerId_key" ON "RemoteWorker"("workerId");

-- CreateIndex
CREATE UNIQUE INDEX "TaskParameterEnum_parameterId_key" ON "TaskParameterEnum"("parameterId");

-- CreateIndex
CREATE UNIQUE INDEX "TaskParameterCustom_parameterId_key" ON "TaskParameterCustom"("parameterId");
