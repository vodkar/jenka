
import { Worker, WorkerStatuses, WorkerTypes } from "@/models/worker";
import type { Route } from "./+types/workers";

const workers: Worker[] = [
    {
        id: 1,
        name: 'Worker 1',
        type: WorkerTypes.LOCAL,
        status: WorkerStatuses.RUNNING,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
        createdBy: 'user1',
        updatedBy: 'user1',
        containerId: 'container1',
        containerName: 'container1',
    },
    {
        id: 2,
        name: 'Worker 2',
        type: WorkerTypes.REMOTE,
        status: WorkerStatuses.IDLE,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
        createdBy: 'user2',
        updatedBy: 'user2',
        url: 'https://example.com',
        token: 'token123',
    },
];

export function WorkersPage({
    loaderData,
}: Route.ComponentProps) {
    return (
        <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-bold">Workers</h1>
            <div className="flex flex-col space-y-2">
                {workers.map((worker) => (
                    <div key={worker.id} className="p-4 border rounded-md">
                        <h2 className="text-xl font-bold">{worker.name}</h2>
                        <p>Type: {worker.type}</p>
                        <p>Status: {worker.status}</p>
                        <p>Created at: {new Date(worker.createdAt).toLocaleString()}</p>
                        <p>Updated at: {new Date(worker.updatedAt).toLocaleString()}</p>
                        <p>Created by: {worker.createdBy}</p>
                        <p>Updated by: {worker.updatedBy}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
