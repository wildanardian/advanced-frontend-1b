import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface AuthFieldProps {
  label: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
  className?: string;
  value?: string;
  error?: string;
  onChange?: (value: string) => void;
}

export default function AuthField({
  label,
  type,
  placeholder,
  autoComplete,
  className = "",
  value,
  error,
  onChange,
}: AuthFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && isPasswordVisible ? "text" : type;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[10px] lg:text-lg">{label}</label>
      <div className="relative">
        <input
          type={inputType}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          aria-invalid={Boolean(error)}
          className={`w-full px-5 py-2 lg:py-3.5 pr-12 text-[#C1C2C4] text-[10px] lg:text-base rounded-3xl border ${error ? "border-error-default" : "border-outline-border"} focus:outline-none focus:ring-2 focus:ring-blue-500 ${isPasswordField ? "" : ""
            }`}
          placeholder={placeholder}
        />
        {isPasswordField ? (
          <button
            type="button"
            onClick={() =>
              setIsPasswordVisible(
                (currentValue) => !currentValue,
              )
            }
            aria-label={
              isPasswordVisible
                ? "Sembunyikan kata sandi"
                : "Tampilkan kata sandi"
            }
            className="absolute inset-y-0 right-4 flex items-center text-[#C1C2C4] transition-colors hover:text-white"
          >
            {isPasswordVisible ? (
              <EyeOff className="h-4 w-4 lg:h-5 lg:w-5" />
            ) : (
              <Eye className="h-4 w-4 lg:h-5 lg:w-5" />
            )}
          </button>
        ) : null}
      </div>
      {error ? (
        <p className="text-[10px] text-error-default lg:text-sm">{error}</p>
      ) : null}
    </div>
  );
}
