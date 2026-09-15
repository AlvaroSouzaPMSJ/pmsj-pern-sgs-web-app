export const FormField = ({ field, value, onChange }) => {

  const inputClass =
    "w-full outline-none text-gray-700 text-sm px-3 py-2 border border-gray-300 rounded-md focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-colors";

  switch (field.type) {
    case "select":
      return (
        <select
          className={inputClass}
          value={value ?? ""}
          onChange={(e) => onChange(field.key, e.target.value)}
        >
          <option value="">selecione</option>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );

    case "radio":
      return (
        <div className="flex flex-col gap-2 mt-1">
          {field.options.map((opt) => (
            <label
              key={opt.value}
              className="flex items-start gap-2 cursor-pointer group"
            >
              <input
                type="radio"
                name={field.key}
                value={opt.value}
                checked={value === opt.value}
                onChange={(e) => onChange(field.key, e.target.value)}
                className="mt-0.5 accent-green-700"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 leading-snug">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      );

    case "textarea":
      return (
        <textarea
          className={`${inputClass} resize-none h-24`}
          value={value ?? ""}
          placeholder={field.placeholder ?? ""}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      );

    default:
      return (
        <input
          className={inputClass}
          type={field.type}
          value={value ?? ""}
          placeholder={field.placeholder ?? ""}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      );
  }
};