"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isEnumParameter, Task } from "@/models/task";
import { Loader2 } from "lucide-react";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";

interface RunTaskFormProps {
    triggerElement: React.ReactNode;
    task: Task;
}


export function RunTaskForm({ task, triggerElement }: RunTaskFormProps) {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [taskRunStarted, setTaskRunStarted] = React.useState(false)

    const zObjectMapping = new Map<string, z.ZodType<any>>()
    for (const param of task.parameters) {
        let validator: z.ZodType<any>
        if (isEnumParameter(param)) {
            const values = param.enumValues
            validator = values.length > 0
                ? z.enum(values as [string, ...string[]])
                : z.string()
        } else {
            const type = param.userDefinedType
            switch (type) {
                case 'string':
                    validator = z.string().min(1);
                    break;
                case 'bool':
                    validator = z.boolean().default(false);
                    break;
                case 'int':
                    validator = z.number().int();
                    break;
                case 'float':
                    validator = z.number();
                    break;
                case 'array':
                    validator = z.array(z.string());
                    break;
                case 'map':
                    validator = z.record(z.string());
                    break;
            }
        }
        if (param.isRequired) {
            zObjectMapping.set(param.name, validator)
        } else {
            zObjectMapping.set(param.name, z.optional(validator))
        }
    }
    const paramsSchema = z.object(Object.fromEntries(zObjectMapping))

    const form = useForm<z.infer<typeof paramsSchema>>({
        resolver: zodResolver(paramsSchema),
    })

    async function onSubmit(values: z.infer<typeof paramsSchema>) {
        setTaskRunStarted(true)
        const taskRun = {
            id: 3,
            runNumber: 1,
            output: "",
            status: "running",
            startedAt: new Date(),
            finishedAt: new Date(),
            taskfileId: task.id,
            hasOutput: false,
            progress: 0,
            parameters: values,
        }
        console.log("Task run", taskRun);
        await new Promise(r => setTimeout(r, 1000));
        form.reset();
        setIsDialogOpen(false);
        setTaskRunStarted(false);
    }


    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                {triggerElement}
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Run Task</DialogTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {task.parameters.map((param) => (
                            <FormField
                                key={param.name}
                                control={form.control}
                                name={param.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{param.name}</FormLabel>
                                        <FormControl>
                                            {!isEnumParameter(param) && (param.userDefinedType === 'int' || param.userDefinedType === 'float') ? (
                                                <Input
                                                    type="number"
                                                    placeholder={`Enter ${param.name}`}
                                                    {...field}
                                                    onChange={e => field.onChange(e.target.valueAsNumber)}
                                                />
                                            ) : !isEnumParameter(param) && param.userDefinedType === 'bool' ? (
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={v => field.onChange(v)}
                                                />
                                            ) : isEnumParameter(param) ? (
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select an option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {param.enumValues.map((value) => (
                                                            <SelectItem key={value} value={value}>
                                                                {value}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <Input type="text" placeholder={`Enter ${param.name}`} {...field} />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <DialogFooter>
                            <Button type="submit">
                                {taskRunStarted && (<Loader2 className="animate-spin" />)}
                                Run Task
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
