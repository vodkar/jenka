import { LogViewerDialog } from "@/components/dialogs/log-viewer";
import { RunTaskForm } from "@/components/dialogs/run-task";
import { MainHeader } from "@/components/sidebar/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Task, TaskRunStatus } from "@/models/task";
import { CheckCircle, ChevronRight, FileText, Loader2, Play, XCircle } from "lucide-react";
import type { Route } from "./+types/project";

const STATUS_CONFIG = {
    running: {
        icon: <Loader2 className="animate-spin text-yellow-500" size={16} />,
        label: "Running",
        color: "yellow",
    },
    success: {
        icon: <CheckCircle className="text-green-500" size={16} />,
        label: "Success",
        color: "green",
    },
    failed: {
        icon: <XCircle className="text-red-500" size={16} />,
        label: "Failed",
        color: "red",
    },
} as const

interface StatusIndicatorProps {
    status: TaskRunStatus;
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
    const { icon, label, color } = STATUS_CONFIG[status]

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Badge
                    variant="outline"
                    className={`flex items-center space-x-1 border-${color}-500 text-${color}-600`}
                >
                    {icon}
                </Badge>
            </TooltipTrigger>
            <TooltipContent side="top">
                {label}
            </TooltipContent>
        </Tooltip>
    )
}

const data: Task[] = [
    {
        id: 1,
        name: "build",
        runHistory: [
            {
                id: 1,
                runNumber: 1,
                output: "Output 1",
                status: TaskRunStatus.FAILED,
                startedAt: new Date("2023-10-01T10:00:00Z"),
                finishedAt: new Date("2023-10-01T11:00:00Z"),
                taskfileId: 1,
                hasOutput: true,
                parameters: {
                    param1: "value1",
                    param2: "value2",
                },
                progress: 50,
            },
            {
                id: 2,
                runNumber: 2,
                output: "Output 2",
                status: TaskRunStatus.SUCCESS,
                startedAt: new Date("2023-10-02T10:00:00Z"),
                finishedAt: new Date("2023-10-02T11:00:00Z"),
                taskfileId: 1,
                hasOutput: true,
                parameters: {
                    param1: "value1",
                    param2: "value2",
                },
                progress: 100,
            },
            {
                id: 3,
                runNumber: 3,
                output: "Output 3",
                status: TaskRunStatus.RUNNING,
                startedAt: new Date("2023-10-03T10:00:00Z"),
                finishedAt: new Date("2023-10-03T11:00:00Z"),
                taskfileId: 1,
                hasOutput: true,
                parameters: {
                    param1: "value1",
                    param2: "value2",
                },
                progress: 75,
            },
        ],
        parameters: [
            {
                name: "param1",
                defaultValue: "default1",
                isRequired: true,
                userDefinedType: "string",
            },
            {
                name: "param2",
                defaultValue: "default2",
                isRequired: false,
                userDefinedType: "int",
            },
            {
                name: "param3",
                defaultValue: "true",
                isRequired: true,
                userDefinedType: "bool",
            },
            {
                name: "param4",
                isRequired: false,
                userDefinedType: "float",
            },
            {
                name: "param5",
                isRequired: false,
                userDefinedType: "array",
            },
            {
                name: "param6",
                isRequired: false,
                userDefinedType: "map",
            },
            {
                name: "param7",
                isRequired: true,
                enumValues: ["value1", "value2", "value3"],
            }
        ],
    },
    {
        id: 2,
        name: "deploy",
        runHistory: [
            {
                id: 4,
                runNumber: 1,
                output: "Output 4",
                status: TaskRunStatus.SUCCESS,
                startedAt: new Date("2023-10-04T10:00:00Z"),
                finishedAt: new Date("2023-10-04T11:00:00Z"),
                taskfileId: 2,
                hasOutput: true,
                parameters: {
                    param1: "value1",
                    param2: "value2",
                },
                progress: 100,
            },
            {
                id: 5,
                runNumber: 2,
                output: "Output 5",
                status: TaskRunStatus.SUCCESS,
                startedAt: new Date("2023-10-05T10:00:00Z"),
                finishedAt: new Date("2023-10-05T11:00:00Z"),
                taskfileId: 2,
                hasOutput: true,
                parameters: {
                    param1: "value1",
                    param2: "value2",
                },
                progress: 100,
            },
        ],
        parameters: []
    }
]

export async function loader({ params }: Route.LoaderArgs) {
    const { projectId } = params;
    return { projectId }
}



export default function ProjectPage({
    loaderData,
}: Route.ComponentProps) {
    return (
        <div>
            <MainHeader headerText="Projects" />
            <div className="px-4">
                {data.map((task) => (
                    <Collapsible id={task.id.toString()} key={task.id} className="group/collapsible">
                        <Card className="mb-4" key={task.id}>
                            <CollapsibleTrigger asChild>
                                <div>
                                    <CardHeader>
                                        <div className="flex items-center gap-4">
                                            <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            <CardTitle>
                                                {task.name}
                                            </CardTitle>
                                            <RunTaskForm triggerElement={
                                                <Button variant="outline">
                                                    <Play />
                                                </Button>
                                            } task={task} />
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-5 items-center gap-4">
                                            {task.runHistory
                                                .sort((a, b) => b.runNumber - a.runNumber)
                                                .slice(0, 5)
                                                .map((run) => (
                                                    <div
                                                        key={run.id}
                                                        className="group-data-[state=open]/collapsible:hidden flex flex-col items-center"
                                                    >
                                                        <p># {run.runNumber}</p>
                                                        <Progress
                                                            value={run.progress}
                                                            indicatorClassName={
                                                                run.status === TaskRunStatus.SUCCESS
                                                                    ? "bg-green-300"
                                                                    : run.status === TaskRunStatus.FAILED
                                                                        ? "bg-red-300"
                                                                        : "bg-yellow-300"
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </CardContent>

                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <ScrollArea className="h-[300px] w-full px-6">
                                    <div>
                                        {task.runHistory.map((run) => (
                                            <div>
                                                <div className="flex flex-wrap my-2 items-center space-x-2 justify-between" key={run.id}>
                                                    <div key={run.id} className="flex items-center space-x-2">
                                                        <StatusIndicator status={run.status} />
                                                        <p>Run #{run.runNumber}</p>
                                                    </div>
                                                    <LogViewerDialog triggerElement={
                                                        <Button variant="ghost">
                                                            <FileText />
                                                        </Button>
                                                    } taskRun={run} />
                                                </div>
                                                <Progress
                                                    value={run.progress}
                                                    indicatorClassName={
                                                        run.status === TaskRunStatus.SUCCESS
                                                            ? "bg-green-300"
                                                            : run.status === TaskRunStatus.FAILED
                                                                ? "bg-red-300"
                                                                : "bg-yellow-300"
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CollapsibleContent>
                        </Card>
                    </Collapsible>
                )
                )}
            </div></div>
    )
}