import { z } from "zod";

// Step 1: Product Information

export const productInformationSchema = z.object({
  // Primary Product Identification
  baseUnitGTIN: z.string().optional(), // GTIN (Global Trade Item Number)
  vendorItemNumber: z.string().optional(), // Vendor Item Number
  supplierAssignedID: z.string().optional(), // Additional Trade Item ID (Supplier)
  manufacturerPartNumber: z.string().optional(), // Manufacturer Part Number
  manufacturerAssignedID: z.string().optional(), // Additional Trade Item ID (Manufacturer)
  buyerPartNumber: z.string().optional(), // Buyer Part Number
  buyerAssignedID: z.string().optional(), // Additional Trade Item ID (Buyer)
  brandName: z.string().min(1, "Brand Name is required"), // Brand
  functionalName: z.string().min(1, "Functional Name is required"), // Descriptions
  netContent: z.string().optional(), // Net Content / UOM
  tradeItemDescription: z.string().optional(), // Item Description
  shortDescription: z.string().optional(), // Secondary Item Description
  searchTextKeywords: z.string().optional(), // Search Text/Keywords
  itemNotes: z.string().optional(), // Item Notes
  countryOfOrigin: z.string().min(1, "Country of Origin is required"), // Origin of Products
  supercedesGTIN: z.string().optional(), // Supercedes GTIN
  informationProviderGLN: z.string().optional(), // System-generated
  informationProviderName: z.string().optional(), // System-generated

  // Classification
  gpcCategoryCode: z.string().optional(), // GPC Category Code
  unspscCode: z.string().optional(), // UNSPSC Code
  additionalClassificationCodeValue: z.string().optional(), // Additional Classification Code Value
  additionalClassificationDescription: z.string().optional(), // Additional Classification Description
  additionalClassificationSystemCode: z.string().optional(), // Additional Classification System Code
  additionalClassificationVersion: z.string().optional(), // Additional Classification Version

  // Tax Information
  dutyFeeTaxRate: z.number().optional(), // GST Exemption / Duty Fee Tax Rate
  dutyFeeTaxAgencyCode: z.literal("ATO").optional(), // System-generated
  dutyFeeTaxTypeCode: z.literal("GST").optional(), // System-generated
  dutyFeeTaxTypeDescription: z.literal("Goods and Services Tax").optional(), // System-generated

  // Vendor and Business Unit
  vendorID: z.string().optional(), // Vendor ID
  additionalPartyIdentification: z.string().optional(), // Buyer Assigned Identifier for a Party
  businessUnit: z.string().optional(), // Business Unit
  partyRoleCode: z.literal("OPERATING_DIVISION").optional(), // System-generated
  partyInRoleName: z.string().optional(), // Party In Role Name

  // productionDateTime: z
  //   .preprocess((value) => {
  //     if (typeof value === "string") return new Date(value);
  //     return value;
  //   }, z.date())
  //   .optional(),
  // productionDateTime: z
  //   .union([z.string(), z.date()])
  //   .transform((val) => (typeof val === "string" ? new Date(val) : val)),
  productionDateTime: z.string().min(1, "Production Date is required"),
  productLife: z.number(),
});

// Step 2: Product Hierarchy
export const productHierarchySchema = z.object({
  numberOfBaseUnits: z.number().int(),

  isConsumerUnit: z.preprocess(
    (value) => value === "true" || value === true,
    z.boolean()
  ),
  isDispatchUnit: z.preprocess(
    (value) => value === "true" || value === true,
    z.boolean()
  ),
  isInvoiceUnit: z.preprocess(
    (value) => value === "true" || value === true,
    z.boolean()
  ),
  isOrderableUnit: z.preprocess(
    (value) => value === "true" || value === true,
    z.boolean()
  ),

  isVariable: z.preprocess(
    (value) => value === "true" || value === true,
    z.boolean()
  ),
  isReturnable: z.preprocess(
    (value) => value === "true" || value === true,
    z.boolean()
  ),
  isService: z.preprocess(
    (value) => value === "true" || value === true,
    z.boolean()
  ),
  hasBatchNumber: z.preprocess(
    (value) => value === "true" || value === true,
    z.boolean()
  ),

  serialNumberLocationCode: z.string().optional(),
  hasRFID: z.preprocess(
    (value) => value === "true" || value === true,
    z.boolean()
  ),
  isRepairable: z.preprocess(
    (value) => value === "true" || value === true,
    z.boolean()
  ),

  orderingUOM: z.string(),
  minimumOrderQuantity: z.number().int().optional(),
  orderingLeadTime: z.number().int(),
  orderingLeadTimeUOM: z.string(),

  tradeItemUnitDescriptorCode: z.string().optional(),
  isBaseUnit: z.preprocess(
    (value) => value === "true" || value === true || value === true,
    z.boolean()
  ),

  // Height / UOM
  height: z
    .preprocess((value) => {
      if (typeof value === "string") return parseFloat(value);
      return value;
    }, z.number())
    .optional(),
  heightUOM: z.string().optional(),

  // Width / UOM
  width: z
    .preprocess((value) => {
      if (typeof value === "string") return parseFloat(value);
      return value;
    }, z.number())
    .optional(),
  widthUOM: z.string().optional(),

  // Depth / UOM
  depth: z
    .preprocess((value) => {
      if (typeof value === "string") return parseFloat(value);
      return value;
    }, z.number())
    .optional(),
  depthUOM: z.string().optional(),

  // Net Volume / UOM
  netVolume: z
    .preprocess((value) => {
      if (typeof value === "string") return parseFloat(value);
      return value;
    }, z.number())
    .optional(),
  netVolumeUOM: z.string().optional(),

  // Gross Volume / UOM
  grossVolume: z
    .preprocess((value) => {
      if (typeof value === "string") return parseFloat(value);
      return value;
    }, z.number())
    .optional(),
  grossVolumeUOM: z.string().optional(),

  // Net Weight / UOM
  netWeight: z
    .preprocess((value) => {
      if (typeof value === "string") return parseFloat(value);
      return value;
    }, z.number())
    .optional(),
  netWeightUOM: z.string().optional(),

  // Gross Weight / UOM
  grossWeight: z
    .preprocess((value) => {
      if (typeof value === "string") return parseFloat(value);
      return value;
    }, z.number())
    .optional(),
  grossWeightUOM: z.string().optional(),
});

// Step 3: Product Dates
export const productDatesSchema = z.object({
  // communityVisibilityDate: z
  //   .union([z.string(), z.date()])
  //   .transform((val) => (typeof val === "string" ? new Date(val) : val))
  //   .optional(),

  // effectiveDate: z
  //   .union([z.string(), z.date()])
  //   .transform((val) => (typeof val === "string" ? new Date(val) : val)),
  // publicationDate: z
  //   .union([z.string(), z.date()])
  //   .transform((val) => (typeof val === "string" ? new Date(val) : val))
  //   .optional(),

  // startAvailabilityDate: z
  //   .union([z.string(), z.date()])
  //   .transform((val) => (typeof val === "string" ? new Date(val) : val))
  //   .optional(),

  // endAvailabilityDate: z
  //   .union([z.string(), z.date()])
  //   .transform((val) => (typeof val === "string" ? new Date(val) : val))
  //   .optional(),

  // finalBatchExpiryDate: z
  //   .union([z.string(), z.date()])
  //   .transform((val) => (typeof val === "string" ? new Date(val) : val))
  //   .optional(),communityVisibilityDate: z
  //   .union([z.string(), z.date()])
  //   .transform((val) => (typeof val === "string" ? new Date(val) : val))
  //   .optional(),

  communityVisibilityDate: z.string().min(1, "Visibility Date is required"),

  effectiveDate: z.string().min(1, "Effective Date is required"),
  publicationDate: z.string().min(1, "Publication Date is required"),
  startAvailabilityDate: z
    .string()
    .min(1, "Start Availability Date is required"),
  endAvailabilityDate: z.string().min(1, "End Availability Date is required"),
  finalBatchExpiryDate: z.string().min(1, "Batch Expiry Date is required"),
});

// Step 4: Product Declarations
export const productDeclarationsSchema = z.object({
  isTradeItemDangerousGood: z
    .boolean()
    .optional()
    .describe("Indicates if the trade item is classified as a dangerous good"),

  unDangerousGoodsNumber: z
    .string()
    .optional()
    .describe("United Nations Dangerous Goods Number (e.g. 'UN1234')"),

  dangerousGoodsHazardousCode: z
    .string()
    .optional()
    .describe("Code representing the hazardous nature of the dangerous good"),

  safetyDataSheetUrl: z
    .string()
    .url()
    .optional()
    .describe("URL pointing to the Safety Data Sheet (SDS)"),

  typeApprovalNumber: z
    .string()
    .optional()
    .describe("Certification Agency (Type Approval Number)"),
  typeApprovalAgency: z
    .string()
    .optional()
    .describe("Certification Value (Type Approval Agency)"),

  warrantyDescription: z
    .string()
    .optional()
    .describe("Text describing the warranty coverage"),

  warrantyDuration: z
    .string()
    .optional()
    .describe("Numeric duration of the warranty"),
  warrantyUom: z
    .string()
    .optional()
    .describe("Unit of measure for the warranty duration (days, months, etc.)"),

  // "Warranty Effective Date Type" -> "Warranty Effective Date Type"
  warrantyEffectiveDateType: z
    .string()
    .optional()
    .describe("Indicates how/when the warranty becomes effective"),

  // "Resource Type" -> "Referenced File Type Code"
  resourceType: z
    .string()
    .optional()
    .describe("File type code for referencing additional resources"),

  // "URL" -> "Uniform Resource Identifier"
  url: z
    .string()
    .url()
    .optional()
    .describe("A generic URL / URI for the product or associated resource"),

  // "Technical Drawing" -> "File Name"
  technicalDrawing: z
    .string()
    .optional()
    .describe("Filename or reference to a technical drawing"),

  // "Revision #" -> "File Version"
  revisionNumber: z
    .string()
    .optional()
    .describe("Version or revision identifier for the technical document"),
});

// Merged Schema for Entire Form Validation
export const railPartSchema = productInformationSchema
  .merge(productHierarchySchema)
  .merge(productDatesSchema)
  .merge(productDeclarationsSchema);

export type ProductInformation = z.infer<typeof productInformationSchema>;
export type ProductHierarchy = z.infer<typeof productHierarchySchema>;
export type ProductDates = z.infer<typeof productDatesSchema>;
export type ProductDeclarations = z.infer<typeof productDeclarationsSchema>;
export type RailPart = z.infer<typeof railPartSchema>;
