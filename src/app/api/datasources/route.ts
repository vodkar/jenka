import { createDatasource, getDatasources } from "@/services/datasource";
import { addDatasourceSchema } from "@/schema/zod/add-datasource";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const datasources = await getDatasources();
    return NextResponse.json(datasources);
  } catch (error) {
    console.error('Failed to fetch datasources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch datasources' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = addDatasourceSchema.parse(body);
    
    const datasource = await createDatasource(validatedData);
    
    return NextResponse.json(datasource, { status: 201 });
  } catch (error) {
    console.error('Failed to create datasource:', error);
    return NextResponse.json(
      { error: 'Failed to create datasource' },
      { status: 500 }
    );
  }
}
