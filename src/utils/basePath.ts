export function normalizeBasePath(base?: string): string {
  const raw = (base ?? "/").trim();
  if (!raw) return "/";

  const stripped = raw.replace(/^\/+|\/+$/g, "");
  return stripped ? `/${stripped}/` : "/";
}

export function withBase(path: string, base?: string): string {
  const normalizedBase = normalizeBasePath(base);
  const cleanPath = path.replace(/^\/+/, "");

  if (!cleanPath) return normalizedBase;
  return `${normalizedBase}${cleanPath}`;
}
