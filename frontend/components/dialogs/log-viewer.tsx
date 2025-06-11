import { TaskRun } from "@/models/task";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import React, { Suspense, use } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

export interface LogViewerDialogProps {
    taskRun: TaskRun;
    triggerElement: React.ReactNode;
}

export function LogViewerDialog({
    taskRun,
    triggerElement,
}: LogViewerDialogProps) {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)

    async function fetchLogs() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return taskRun.output || "No logs available";
    }

    function Logs({ dataPromise }: { dataPromise: Promise<string> }) {
        const data = use(dataPromise);
        return <ScrollArea className="h-[400px] overflow-y-auto">
            <pre className="whitespace-pre-wrap">{data}</pre>
        </ScrollArea>
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                {triggerElement}
            </DialogTrigger>
            <DialogContent className="w-full max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Task Run Logs</DialogTitle>
                    <DialogDescription>
                        Logs for task run #{taskRun.runNumber}
                    </DialogDescription>
                </DialogHeader>
                <Suspense fallback={<Loader2 className="animate-spin" />}>
                    <Logs dataPromise={fetchLogs()} />
                </Suspense>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}