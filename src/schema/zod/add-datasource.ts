"use client"

import { DatasourceTypes } from "@/models/datasource"
import { z } from "zod"

export const addDatasourceSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  type: z.nativeEnum(DatasourceTypes)
})
