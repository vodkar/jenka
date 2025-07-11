import { $Enums } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { CreateDatasourceDTO, Datasource } from "@/models/datasource";

function transformDatasource(datasource: { id: number; name: string; type: $Enums.DatasourceType; description: string; createdAt: Date; updatedAt: Date; createdBy: string; updatedBy: string; }): Datasource {
    return {
        id: datasource.id,
        name: datasource.name,
        type: datasource.type as Datasource['type'],
        description: datasource.description,
        createdAt: datasource.createdAt.toISOString(),
        updatedAt: datasource.updatedAt.toISOString(),
        createdBy: datasource.createdBy,
        updatedBy: datasource.updatedBy,
    };
}


export async function getDatasources(): Promise<Datasource[]> {
    const datasources = await prisma.datasource.findMany()
    return datasources.map(transformDatasource);
}

export async function createDatasource(dto: CreateDatasourceDTO): Promise<Datasource> {

    const datasource = await prisma.datasource.create({
        data: {
            name: dto.name,
            description: dto.description,
            type: dto.type,
            createdBy: 'system',
            updatedBy: 'system',
        },
    });

    return transformDatasource(datasource);
}

export async function removeDatasource(id: number): Promise<void> {
    await prisma.datasource.delete({
        where: { id },
    });
}
