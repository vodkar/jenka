export enum WorkerStatuses {
    RUNNING = 'running',
    IDLE = 'idle',
    ERROR = 'error',
    OFFLINE = 'offline',
}

export enum WorkerTypes {
    LOCAL = 'LOCAL',
    REMOTE = 'REMOTE',
}

export interface BaseWorker {
    id: number;
    name: string;
    type: WorkerTypes;
    status: WorkerStatuses;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}
export interface LocalWorker extends BaseWorker {
    type: WorkerTypes.LOCAL;
    containerId: string;
    containerName: string;
}
export interface RemoteWorker extends BaseWorker {
    type: WorkerTypes.REMOTE;
    url: string;
    token: string;
}
export type Worker = LocalWorker | RemoteWorker;
