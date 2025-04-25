"use client"

import { z } from "zod"

export const addProjectSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  datasourceId: z.string().min(1, { message: "Datasource is required" }),
})
