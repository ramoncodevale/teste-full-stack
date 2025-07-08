type AuthInputProps = {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const AuthInput = ({ id, type, label, value, onChange, placeholder }: AuthInputProps) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>
);

export default AuthInput;
