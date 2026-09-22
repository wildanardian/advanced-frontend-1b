import { Pencil } from "lucide-react";
import { useState } from "react";

interface InputFieldProps {
  label: string;
  type: "text" | "password" | "email";
  value: string;
  onSave: (newValue: string) => void;
  editable?: boolean;
}

export default function InputField(props: InputFieldProps) {
  const { label, value, onSave, type, editable } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onSave?.(inputValue)
    setIsEditing(false)
  }

  return (
    <div className="flex px-4 py-2 rounded-md border border-outline-border/23 bg-background-paper w-full">
      <div className="flex flex-col gap-2 w-full">
        <span className="text-sm font-300 text-light-disabled">
          {label}
        </span>
        {isEditing ? (
          <input
            type={type}
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="text-base bg-transparent outline-none"
          />
        ) : (
          <span className="text-base">
            {type === "password" ? "••••••••••" : inputValue}
          </span>
        )}
      </div>
      {editable && (
        <button type="button" onClick={() => setIsEditing(true)} aria-label={`Edit ${label}`}>
          <Pencil className="h-5 w-5 text-white" />
        </button>
      )}
    </div>
  );
}
