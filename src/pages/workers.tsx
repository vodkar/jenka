
import { MainHeader } from "@/components/sidebar/header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Worker, WorkerStatuses, WorkerTypes } from "@/models/worker";
import { CirclePlus, Cloud, Moon, Server, Shovel, Skull, Unplug } from "lucide-react";
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
    {
        id: 3,
        name: 'Worker 3',
        type: WorkerTypes.LOCAL,
        status: WorkerStatuses.ERROR,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
        createdBy: 'user3',
        updatedBy: 'user3',
        containerId: 'container2',
        containerName: 'container2',
    },
    {
        id: 4,
        name: 'Worker 4',
        type: WorkerTypes.REMOTE,
        status: WorkerStatuses.OFFLINE,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
        createdBy: 'user4',
        updatedBy: 'user4',
        url: 'https://example.com/worker4',
        token: 'token456',
    }
];

const WORKER_STATUSES_UI = new Map([
    [WorkerStatuses.RUNNING, {
        icon: <Shovel />,
        text: 'Running',
        color: 'green',
    }],
    [
        WorkerStatuses.ERROR, {
            icon: <Skull />,
            text: 'Error',
            color: 'red',
        }],
    [
        WorkerStatuses.IDLE, {
            icon: <Moon />,
            text: 'Idle',
            color: 'yellow',
        }],
    [
        WorkerStatuses.OFFLINE, {
            icon: <Unplug />,
            text: 'Offline',
            color: 'gray',
        }],
]
)

const WORKER_TYPES_UI = new Map([
    [WorkerTypes.LOCAL, <Server size={16} />],
    [WorkerTypes.REMOTE, <Cloud size={16} />],
]
)

export default function WorkersPage({
    loaderData,
}: Route.ComponentProps) {
    return (
        <div>
            <MainHeader headerText="Workers" additionalElements={[
                <Button size="sm" variant="outline">
                    <CirclePlus />
                    Add Worker
                </Button>
            ]} />
            <div className="*:data-[slot=card]:shadow-xs px-4 gap-4 grid grid-cols-3 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card">
                {workers.map((worker) => (
                    <Card className="@container/card">
                        <CardHeader className="relative">
                            <CardDescription>
                                <div className="flex items-center gap-2">
                                    {WORKER_TYPES_UI.get(worker.type)} {worker.name}
                                </div>
                            </CardDescription>
                            <CardTitle className="flex items-center gap-2">
                                {WORKER_STATUSES_UI.get(worker.status)?.icon}
                                <span className={`text-${WORKER_STATUSES_UI.get(worker.status)?.color}-500`}>
                                    {WORKER_STATUSES_UI.get(worker.status)?.text}
                                </span>
                            </CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
