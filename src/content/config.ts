import { defineCollection, z } from "astro:content";
import { camelCase, sheetLoader } from "astro-sheet-loader";

function extractDocumentId(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";

  const match = trimmed.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match?.[1] ?? trimmed;
}

function extractGid(input: string): number | undefined {
  const match = input.match(/[?#&]gid=(\d+)/);
  if (!match) return undefined;

  const gid = Number.parseInt(match[1], 10);
  return Number.isNaN(gid) ? undefined : gid;
}

const sheetValue =
  import.meta.env.PUBLIC_GOOGLE_SHEETS_DOCUMENT_ID ??
  import.meta.env.PUBLIC_GOOGLE_SHEETS_CSV_URL ??
  "";

const documentId = extractDocumentId(sheetValue);
const gid = extractGid(sheetValue);

const phones = defineCollection({
  loader: sheetLoader({
    document: documentId || "missing-document-id",
    gid: 0,
    query: "select A,B,C,D,E label A 'model', B 'color', C 'storage', D 'condition', E 'image'",
    // ...(gid !== undefined ? { gid } : {}),
  }),
  // schema: z.object({
  //   model: z.string().default(""),
  //   price: z.union([z.string(), z.number()]).transform((value) => String(value ?? "")),
  //   storage: z.string().default(""),
  //   condition: z.string().default(""),
  //   image: z.string().default(""),
  // }),
});

export const collections = { phones };
