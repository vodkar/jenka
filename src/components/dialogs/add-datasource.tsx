"use client"

import { createDatasourceAction } from "@/actions/datasource";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
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
import { Datasource, DatasourceTypes } from "@/models/datasource";
import { addDatasourceSchema } from "@/schema/zod/add-datasource";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";

interface AddDatasourceFormProps {
    triggerElement: React.ReactNode;
    datasources: Datasource[];
    onDatasourceCreated?: (datasource: Datasource) => void;
}

export function AddDatasourceForm({ triggerElement, onDatasourceCreated }: AddDatasourceFormProps) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof addDatasourceSchema>>({
        resolver: zodResolver(addDatasourceSchema),
        defaultValues: {
            name: "",
            description: "",
            type: DatasourceTypes.LOCAL,
        },
    });

    async function onSubmit(values: z.infer<typeof addDatasourceSchema>) {
        startTransition(async () => {
            const result = await createDatasourceAction(values);

            if (result.success) {
                form.reset();
                setOpen(false);
                onDatasourceCreated?.(result.data);
            } else {
                console.error('Failed to create datasource:', result.error);
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerElement}
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Add Datasource</DialogTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Datasource name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the name of the datasource. It will be used to identify the
                                        datasource in the system.
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
                                        <Textarea placeholder="Datasource description" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the description of the datasource. It will be used to
                                        identify the datasource in the system.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}>
                                            <SelectTrigger id="datasource-datasource" className="w-full">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                {Object.keys(DatasourceTypes).map((dsType) => (
                                                    <SelectItem value={dsType} key={dsType}>
                                                        {dsType}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        This is the type of the datasource. It will be used to identify
                                        the datasource in the system.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Creating..." : "Create"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}