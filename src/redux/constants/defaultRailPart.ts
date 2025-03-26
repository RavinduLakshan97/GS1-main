import { RailPart } from "../../utils/validations/railPartSchema";

interface FieldMetadata<T> {
  value: T;
  dataType: string;
  entryType:
    | "text"
    | "number"
    | "datetime"
    | "checkbox"
    | "select"
    | "boolean"
    | "Default";
  step: number;
}

type RailPartMetadata = {
  [K in keyof RailPart]: FieldMetadata<RailPart[K]>;
};

const defaultRailPart: RailPartMetadata = {
  // Product Information
  baseUnitGTIN: { value: "", dataType: "string", entryType: "text", step: 1 },
  vendorItemNumber: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },
  supplierAssignedID: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },
  manufacturerPartNumber: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },
  manufacturerAssignedID: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },
  buyerPartNumber: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },
  buyerAssignedID: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },
  brandName: { value: "", dataType: "string", entryType: "text", step: 1 },
  functionalName: { value: "", dataType: "string", entryType: "text", step: 1 },
  netContent: { value: "", dataType: "string", entryType: "text", step: 1 },
  tradeItemDescription: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },
  shortDescription: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },
  searchTextKeywords: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },
  itemNotes: { value: "", dataType: "string", entryType: "text", step: 1 },
  countryOfOrigin: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },
  supercedesGTIN: { value: "", dataType: "string", entryType: "text", step: 1 },
  //   informationProviderGLN: {
  //     value: "",
  //     dataType: "string",
  //     entryType: "System Generated",
  //   },
  //   informationProviderName: {
  //     value: "",
  //     dataType: "string",
  //     entryType: "System Generated",
  //   },

  // Classification
  gpcCategoryCode: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },
  unspscCode: { value: "", dataType: "string", entryType: "text", step: 1 },
  additionalClassificationCodeValue: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },
  additionalClassificationDescription: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },
  additionalClassificationSystemCode: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },
  additionalClassificationVersion: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },

  // Tax Information
  //   dutyFeeTaxRate: {
  //     value: 0,
  //     dataType: "number",
  //     entryType: "System Generated",
  //   },
  dutyFeeTaxAgencyCode: {
    value: "ATO",
    dataType: "string",
    entryType: "Default",
    step: 1,
  },
  dutyFeeTaxTypeCode: {
    value: "GST",
    dataType: "string",
    entryType: "Default",
    step: 1,
  },
  dutyFeeTaxTypeDescription: {
    value: "Goods and Services Tax",
    dataType: "string",
    entryType: "Default",
    step: 1,
  },

  // Vendor and Business Unit
  vendorID: { value: "", dataType: "string", entryType: "text", step: 1 },
  additionalPartyIdentification: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },
  businessUnit: { value: "", dataType: "string", entryType: "text", step: 1 },
  partyRoleCode: {
    value: "OPERATING_DIVISION",
    dataType: "string",
    entryType: "Default",
    step: 1,
  },
  partyInRoleName: {
    value: "",
    dataType: "string",
    entryType: "text",
    step: 1,
  },

  // Dates
  productionDateTime: {
    value: "",
    dataType: "string | Date",
    entryType: "datetime",
    step: 1,
  },
  productLife: {
    value: 0,
    dataType: "number",
    entryType: "number",
    step: 1,
  },
  //step 2
  numberOfBaseUnits: {
    value: 0,
    dataType: "number",
    entryType: "number",
    step: 2,
  },

  isConsumerUnit: {
    value: true,
    dataType: "boolean",
    entryType: "checkbox",
    step: 2,
  },
  isDispatchUnit: {
    value: false,
    dataType: "boolean",
    entryType: "checkbox",
    step: 2,
  },
  isInvoiceUnit: {
    value: false,
    dataType: "boolean",
    entryType: "checkbox",
    step: 2,
  },
  isOrderableUnit: {
    value: false,
    dataType: "boolean",
    entryType: "checkbox",
    step: 2,
  },

  isVariable: {
    value: false,
    dataType: "boolean",
    entryType: "checkbox",
    step: 2,
  },
  isReturnable: {
    value: false,
    dataType: "boolean",
    entryType: "checkbox",
    step: 2,
  },
  isService: {
    value: false,
    dataType: "boolean",
    entryType: "checkbox",
    step: 2,
  },
  hasBatchNumber: {
    value: false,
    dataType: "boolean",
    entryType: "checkbox",
    step: 2,
  },

  serialNumberLocationCode: {
    value: "",
    dataType: "text",
    entryType: "text",
    step: 2,
  },
  hasRFID: {
    value: false,
    dataType: "boolean",
    entryType: "checkbox",
    step: 2,
  },
  isRepairable: {
    value: false,
    dataType: "boolean",
    entryType: "checkbox",
    step: 2,
  },

  orderingUOM: { value: "", dataType: "text", entryType: "text", step: 2 },
  minimumOrderQuantity: {
    value: 0,
    dataType: "number",
    entryType: "number",
    step: 2,
  },
  orderingLeadTime: {
    value: 0,
    dataType: "number",
    entryType: "number",
    step: 2,
  },
  orderingLeadTimeUOM: {
    value: "",
    dataType: "text",
    entryType: "text",
    step: 2,
  },

  tradeItemUnitDescriptorCode: {
    value: "",
    dataType: "text",
    entryType: "text",
    step: 2,
  },
  isBaseUnit: {
    value: false,
    dataType: "boolean",
    entryType: "checkbox",
    step: 2,
  },

  height: { value: 0, dataType: "number", entryType: "number", step: 2 },
  heightUOM: { value: "", dataType: "text", entryType: "text", step: 2 },

  width: { value: 0, dataType: "number", entryType: "number", step: 2 },
  widthUOM: { value: "", dataType: "text", entryType: "text", step: 2 },

  depth: { value: 0, dataType: "number", entryType: "number", step: 2 },
  depthUOM: { value: "", dataType: "text", entryType: "text", step: 2 },

  netVolume: { value: 0, dataType: "number", entryType: "number", step: 2 },
  netVolumeUOM: { value: "", dataType: "text", entryType: "text", step: 2 },

  grossVolume: { value: 0, dataType: "number", entryType: "number", step: 2 },
  grossVolumeUOM: { value: "", dataType: "text", entryType: "text", step: 2 },

  netWeight: { value: 0, dataType: "number", entryType: "number", step: 2 },
  netWeightUOM: { value: "", dataType: "text", entryType: "text", step: 2 },

  grossWeight: { value: 0, dataType: "number", entryType: "number", step: 2 },
  grossWeightUOM: { value: "", dataType: "text", entryType: "text", step: 2 },

  //step 3

  communityVisibilityDate: {
    value: "",
    dataType: "datetime",
    entryType: "datetime",
    step: 3,
  },
  effectiveDate: {
    value: "",
    dataType: "datetime",
    entryType: "datetime",
    step: 3,
  },
  publicationDate: {
    value: "",
    dataType: "datetime",
    entryType: "datetime",
    step: 3,
  },
  startAvailabilityDate: {
    value: "",
    dataType: "datetime",
    entryType: "datetime",
    step: 3,
  },
  endAvailabilityDate: {
    value: "",
    dataType: "datetime",
    entryType: "datetime",
    step: 3,
  },
  finalBatchExpiryDate: {
    value: "",
    dataType: "datetime",
    entryType: "datetime",
    step: 3,
  },

  //step 4
  isTradeItemDangerousGood: {
    value: false,
    dataType: "boolean",
    entryType: "checkbox",
    step: 4,
  },
  unDangerousGoodsNumber: {
    value: "",
    dataType: "text",
    entryType: "text",
    step: 4,
  },
  dangerousGoodsHazardousCode: {
    value: "",
    dataType: "text",
    entryType: "text",
    step: 4,
  },
  safetyDataSheetUrl: {
    value: "",
    dataType: "text",
    entryType: "text",
    step: 4,
  },
  typeApprovalNumber: {
    value: "",
    dataType: "text",
    entryType: "text",
    step: 4,
  },
  typeApprovalAgency: {
    value: "",
    dataType: "text",
    entryType: "text",
    step: 4,
  },
  warrantyDescription: {
    value: "",
    dataType: "text",
    entryType: "text",
    step: 4,
  },
  warrantyDuration: { value: "", dataType: "text", entryType: "text", step: 4 },
  warrantyUom: { value: "", dataType: "text", entryType: "text", step: 4 },
  warrantyEffectiveDateType: {
    value: "",
    dataType: "text",
    entryType: "text",
    step: 4,
  },
  resourceType: { value: "", dataType: "text", entryType: "text", step: 4 },
  url: { value: "", dataType: "text", entryType: "text", step: 4 },
  technicalDrawing: { value: "", dataType: "text", entryType: "text", step: 4 },
  revisionNumber: { value: "", dataType: "text", entryType: "text", step: 4 },
};

const defaultRailPartValues = Object.fromEntries(
  Object.entries(defaultRailPart).map(([key, metadata]) => [
    key,
    metadata.value,
  ])
) as RailPart;

export { defaultRailPart, defaultRailPartValues };
