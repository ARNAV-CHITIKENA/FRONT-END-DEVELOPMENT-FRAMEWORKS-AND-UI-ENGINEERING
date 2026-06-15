const InputField = ({ value,  onChange,  children}) => (
  <div>
    <label>
      {children}
    </label>

    <br />

    <input   type="text"   value={value}  onChange={(event) =>
        onChange(event.target.value)
      }
    />

  </div>

);
export default InputField;