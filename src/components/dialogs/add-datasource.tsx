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
import { Datasource, DatasourceTypes } from "@/models/datasource";
import { addDatasourceSchema } from "@/schema/zod/add-datasource";
import { DialogClose } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";

interface AddDatasourceFormProps {
    triggerElement: React.ReactNode;
    datasources: Datasource[];
    setDatasources: (datasources: Datasource[]) => void;
}

export function AddDatasourceForm({ triggerElement, datasources, setDatasources }: AddDatasourceFormProps) {
    const form = useForm<z.infer<typeof addDatasourceSchema>>({
        resolver: zodResolver(addDatasourceSchema),
        defaultValues: {
            name: "",
            description: "",
            type: DatasourceTypes.LOCAL,
        },
    })

    function onSubmit(values: z.infer<typeof addDatasourceSchema>) {
        const datasource = {
            id: 3,
            name: values.name,
            description: values.description,
            type: values.type,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: "me",
            updatedBy: "me",
        }
        setDatasources([...datasources, datasource])
    }

    return (
        <Dialog >
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
