const rawBase = import.meta.env.VITE_API_URL || "";
const base = rawBase.replace(/\/+$|\/api$/i, "");

export function apiUrl(path) {
    const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
    if (!base) {
        return `/api/${normalizedPath}`;
    }

    return `${base.replace(/\/$/, "")}/api/${normalizedPath}`;
}
