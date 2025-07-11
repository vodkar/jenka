"use client"

import { createDatasourceAction } from "@/actions/datasource";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
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
            path: "",
            repository: "",
            branch: "",
            credentialsId: 0,
            bucketName: "",
            region: "",
        },
    });

    const selectedType = form.watch("type");

    useEffect(() => {
        if (selectedType === DatasourceTypes.LOCAL) {
            form.setValue("repository", "");
            form.setValue("branch", "");
            form.setValue("credentialsId", 0);
            form.setValue("bucketName", "");
            form.setValue("region", "");
        } else if (selectedType === DatasourceTypes.GITHUB) {
            form.setValue("path", "");
            form.setValue("bucketName", "");
            form.setValue("region", "");
        } else if (selectedType === DatasourceTypes.S3) {
            form.setValue("path", "");
            form.setValue("repository", "");
            form.setValue("branch", "");
        }
        form.trigger();
    }, [selectedType, form]);

    async function onSubmit(values: z.infer<typeof addDatasourceSchema>) {
        startTransition(async () => {
            const result = await createDatasourceAction(values);

            if (result.success) {
                form.reset();
                setOpen(false);
                if (result.data) {
                    onDatasourceCreated?.(result.data);
                }
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
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogTitle>Add Datasource</DialogTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                        {selectedType === DatasourceTypes.LOCAL && (
                            <FormField
                                control={form.control}
                                name="path"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Local Path</FormLabel>
                                        <FormControl>
                                            <Input placeholder="/path/to/your/project" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The absolute path to the local directory containing your project files.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {selectedType === DatasourceTypes.GITHUB && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="repository"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Repository</FormLabel>
                                            <FormControl>
                                                <Input placeholder="owner/repo-name" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                The GitHub repository in the format "owner/repository-name".
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="branch"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Branch</FormLabel>
                                            <FormControl>
                                                <Input placeholder="main" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                The branch to use from the repository.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="credentialsId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>GitHub Credentials ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="1"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                The ID of the stored GitHub credentials to use for authentication.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {selectedType === DatasourceTypes.S3 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="bucketName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>S3 Bucket Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="my-bucket-name" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                The name of the S3 bucket containing your files.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="region"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>AWS Region</FormLabel>
                                            <FormControl>
                                                <Input placeholder="us-east-1" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                The AWS region where your S3 bucket is located.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="credentialsId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>AWS Credentials ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="1"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                The ID of the stored AWS credentials to use for S3 access.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

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