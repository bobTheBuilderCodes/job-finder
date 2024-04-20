// InputField.tsx
interface InputFieldProps {
  name: string;
  label?: string;
  type?: "text" | "textarea" | "select";
  options?: string[];
  placeholder?: string;
  value: string;
  className?: string
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  options,
  placeholder,
  className,
  value,
  onChange,
}) => {
  const inputType =
    type === "textarea" ? "textarea" : type === "select" ? "select" : "input";
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="font-medium text-gray-900 mb-3 text-lg">{label}</label>
      {inputType === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          className="bg-white outline-1 outline-gray-200 h-48 resize-none appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-full"
          value={value}
          onChange={onChange}
        />
      ) : inputType === "select" ? (
        <select
          name={name}
          className="bg-white outline-1 py-3 outline-gray-200 appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-full"
          value={value}
          onChange={onChange}
        >
          {options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="bg-white outline-1 outline-gray-200 appearance-none shadow-sm border-2 border-gray-100 font-semibold text-gray-700 rounded-lg p-5 pr-10 w-full"
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default InputField;
