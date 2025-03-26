import { z } from "zod";

export const ComplaintSchema = z.object({
  ComplaintNo: z.number().int().positive(),
  ComplaintDate: z.string().datetime().nullable().optional(),
  CustomerCode: z.string().min(1, "Customer Code is required"),
  Department: z.string().min(1, "Department is required"),
  SourceName: z.string().min(1, "Source Name is required"),
  ProductServiceCode: z.string().min(1, "Product Service Code is required"),
  ProblemDescription: z.string().min(1, "Problem Description is required"),
  DefectCategory: z.string().min(1, "Defect Category is required"),
  ProblemCategory: z.string().min(1, "Problem Category is required"),
  Status: z.string().min(1, "Status is required"),
  IsOverdue: z.boolean(),
  Priority: z.number().int().min(1, "Priority must be at least 1"),
});

export type ComplaintType = z.infer<typeof ComplaintSchema>;
