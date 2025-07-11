"use server"

import { addDatasourceSchema } from "@/schema/zod/add-datasource";
import { createDatasource, getDatasources, removeDatasource } from "@/services/datasource";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getDatasourcesAction() {
    try {
        const datasources = await getDatasources();
        return { success: true, data: datasources };
    } catch (error) {
        console.error('Failed to fetch datasources:', error);
        return { success: false, error: 'Failed to fetch datasources', data: [] };
    }
}

export async function createDatasourceAction(data: z.infer<typeof addDatasourceSchema>) {
    try {
        const validatedData = addDatasourceSchema.parse(data);

        const datasource = await createDatasource(validatedData);

        revalidatePath('/datasources');

        return { success: true, data: datasource };
    } catch (error) {
        console.error('Failed to create datasource:', error);
        return { success: false, error: 'Failed to create datasource' };
    }
}

export async function removeDatasourceAction(id: number) {
    try {
        await removeDatasource(id);

        revalidatePath('/datasources');

        return { success: true };
    } catch (error) {
        console.error('Failed to remove datasource:', error);
        return { success: false, error: 'Failed to remove datasource' };
    }
}