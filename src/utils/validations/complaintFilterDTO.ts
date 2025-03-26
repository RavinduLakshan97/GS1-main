import { z } from "zod";

export const ComplaintFilterSchema = z.object({
  ComplaintNo: z.number().int().positive().optional(),
  CustomerCode: z.string().optional(),
  Department: z.string().optional(),
  ComplaintDate: z.string().datetime().optional(),
  DateFrom: z.string().datetime().optional(),
  DateTo: z.string().datetime().optional(),
  SourceName: z.string().optional(),
  ProductServiceCode: z.string().optional(),
  DefectCategory: z.string().optional(),
  ProblemCategory: z.string().optional(),
  Status: z.string().optional(),
  ExcludeClosedComplaints: z.boolean().optional().default(false),
  SortBy: z.string().optional(),
  SortOrder: z.enum(["asc", "desc"]).optional().default("asc"),
});

export type ComplaintFilterType = z.infer<typeof ComplaintFilterSchema>;
