"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Datasource } from "@/models/datasource";
import { Project } from "@/models/project";
import { addProjectSchema } from "@/schema/zod/add-project";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";

interface AddProjectFormProps {
    availableDatasources: Datasource[];
    triggerElement: React.ReactNode;
    projects: Project[];
    setProjects: (projects: Project[]) => void;
}

export function AddProjectForm({ availableDatasources, triggerElement, projects, setProjects }: AddProjectFormProps) {
    const form = useForm<z.infer<typeof addProjectSchema>>({
        resolver: zodResolver(addProjectSchema),
        defaultValues: {
            name: "",
            description: "",
            datasourceId: "",
        },
    })

    function onSubmit(values: z.infer<typeof addProjectSchema>) {
        const project = {
            id: Math.floor(Math.random() * 1000),
            name: values.name,
            description: values.description,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: "me",
            updatedBy: "me",
            datasourceId: parseInt(values.datasourceId),
        };
        setProjects([...projects, project]);
        form.reset();
    }

    return (
        <Dialog >
            <DialogTrigger asChild>
                {triggerElement}
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Add Project</DialogTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Project name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the name of the project. It will be used to identify the
                                        project in the system.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Project description" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the description of the project. It will be used to
                                        identify the project in the system.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="datasourceId"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Datasource</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}>
                                            <SelectTrigger id="project-datasource" className="w-full">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                {availableDatasources.map((ds) => (
                                                    <SelectItem value={ds.id.toString()} key={ds.id}>
                                                        {ds.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        This is the datasource of the project. It will be used to identify
                                        the project in the system.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit">Create</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
