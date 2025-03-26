import { z, ZodTypeAny } from "zod";

/**
 * Recursively unwraps optional and preprocess (ZodEffects) schemas,
 * returning the innermost effective schema.
 *
 * @param schema The Zod schema to unwrap.
 * @returns The normalized Zod schema.
 */
export const normalizeSchema = (schema: ZodTypeAny): ZodTypeAny => {
  // Unwrap optional types
  if (schema instanceof z.ZodOptional) {
    return normalizeSchema(schema.unwrap());
  }

  // Unwrap preprocess (ZodEffects) types
  if (schema instanceof z.ZodEffects) {
    return normalizeSchema(schema._def.schema);
  }

  return schema;
};

/**
 * Takes a Zod schema object and returns a normalized version of its shape.
 *
 * @param zodSchema The input Zod object schema.
 * @returns An object containing normalized schemas.
 */
export const getNormalizedSchemaShape = (zodSchema: z.ZodObject<any>) => {
  return Object.fromEntries(
    Object.entries(zodSchema.shape).map(([key, schema]) => [
      key,
      normalizeSchema(schema),
    ])
  );
};
