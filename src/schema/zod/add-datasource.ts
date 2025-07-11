import { DatasourceTypes } from "@/models/datasource";
import { z } from "zod";

export const addDatasourceSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().optional(),
  type: z.nativeEnum(DatasourceTypes),
  path: z.string().optional(),
  repository: z.string().optional(),
  branch: z.string().optional(),
  credentialsId: z.number().optional(),
  bucketName: z.string().optional(),
  region: z.string().optional(),
}).refine((data) => {
  if (data.type === DatasourceTypes.LOCAL) {
    return data.path && data.path.length > 0;
  }
  return true;
}, {
  message: "Path is required for local datasources",
  path: ["path"],
}).refine((data) => {
  if (data.type === DatasourceTypes.GITHUB) {
    return data.repository && data.repository.length > 0 &&
      data.branch && data.branch.length > 0 &&
      data.credentialsId && data.credentialsId > 0;
  }
  return true;
}, {
  message: "Repository, branch, and credentials ID are required for GitHub datasources",
  path: ["repository"],
}).refine((data) => {
  if (data.type === DatasourceTypes.S3) {
    return data.bucketName && data.bucketName.length > 0 &&
      data.region && data.region.length > 0 &&
      data.credentialsId && data.credentialsId > 0;
  }
  return true;
}, {
  message: "Bucket name, region, and credentials ID are required for S3 datasources",
  path: ["bucketName"],
});