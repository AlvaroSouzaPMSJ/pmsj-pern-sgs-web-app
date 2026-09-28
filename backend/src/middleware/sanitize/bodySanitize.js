export default function bodySanitize(req, _res, next) {
  const clean = (v) => {
    if (typeof v === "string") return v.replace(/\0/g, "").trim();
    if (Array.isArray(v)) return v.map(clean);
    if (v && typeof v === "object") {
      for (const k of Object.keys(v)) v[k] = clean(v[k]);
    }
    return v;
  };
  if (req.body) req.body = clean(req.body);
  next();
}