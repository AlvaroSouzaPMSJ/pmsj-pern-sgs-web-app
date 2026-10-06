// frontend/src/features/primary-attention/components/FormField.jsx
import { FIELD_TYPES } from "../config/caseReportPages.js";
import { formatCpf, stripCpf } from "../../users/utils/formatCpf.js";
import { formatPhone, stripPhone } from "../../users/utils/formatPhone.js";

const formatCns = (digits) => {
  const d = String(digits ?? "").replace(/\D/g, "").slice(0, 15);
  return d.replace(/^(\d{3})(\d{4})(\d{4})(\d{4})$/, "$1 $2 $3 $4");
};
const stripCns = (v) => String(v ?? "").replace(/\D/g, "");

const applyMask = (mask, value) => {
  if (mask === "cpf") return formatCpf(value);
  if (mask === "phone") return formatPhone(value);
  if (mask === "cns") return formatCns(value);
  return value;
};

const stripMask = (mask, value) => {
  if (mask === "cpf") return stripCpf(value);
  if (mask === "phone") return stripPhone(value);
  if (mask === "cns") return stripCns(value);
  return value;
};

export const FormField = ({ field, value, onChange }) => {
  const { key, type, placeholder, options = [], mask } = field;

  const handleChange = (e) => {
    const raw = e.target.value;
    const next = mask ? stripMask(mask, raw) : raw;
    onChange(key, next);
  };

  const displayValue = mask ? applyMask(mask, value) : value ?? "";

  const baseInput =
    "w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-600";

  switch (type) {
    case FIELD_TYPES.TEXTAREA:
      return (
        <textarea
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          rows={4}
          className={baseInput}
        />
      );

    case FIELD_TYPES.SELECT:
      return (
        <select value={value ?? ""} onChange={handleChange} className={baseInput}>
          <option value="">Selecione…</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );

    case FIELD_TYPES.RADIO:
      return (
        <div className="flex flex-wrap gap-4">
          {options.map((o) => (
            <label key={o.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={key}
                value={o.value}
                checked={value === o.value}
                onChange={handleChange}
                className="accent-green-700"
              />
              <span className="text-sm">{o.label}</span>
            </label>
          ))}
        </div>
      );

    case FIELD_TYPES.NUMBER:
      return (
        <input
          type="number"
          value={value ?? ""}
          onChange={handleChange}
          placeholder={placeholder}
          className={baseInput}
        />
      );

    case FIELD_TYPES.DATE:
      return (
        <input
          type="date"
          value={value ?? ""}
          onChange={handleChange}
          className={baseInput}
        />
      );

    case FIELD_TYPES.TEXT:
    default:
      return (
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={baseInput}
        />
      );
  }
};