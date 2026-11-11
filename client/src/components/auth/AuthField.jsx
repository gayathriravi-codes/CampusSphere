import { useState } from 'react'
import { ChevronDown, Eye, EyeOff } from 'lucide-react'

export default function AuthField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  hint,
  placeholder,
  autoComplete,
  name = id,
  options,
  disabled = false,
  className = '',
}) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className={`auth-field ${error ? 'has-error' : ''} ${className}`.trim()}>
      <label htmlFor={id}>{label}</label>

      <div className="auth-field__control">
        {options ? (
          <>
            <select
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
              required
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={describedBy}
            >
              <option value="" disabled>
                {placeholder || 'Select an option'}
              </option>
              {options.map((option) => {
                const optionValue = typeof option === 'string' ? option : option.value
                const optionLabel = typeof option === 'string' ? option : option.label
                return (
                  <option key={optionValue} value={optionValue}>
                    {optionLabel}
                  </option>
                )
              })}
            </select>
            <ChevronDown className="auth-field__chevron" size={16} aria-hidden="true" />
          </>
        ) : (
          <>
            <input
              id={id}
              name={name}
              type={inputType}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
              required
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={describedBy}
            />
            {isPassword && (
              <button
                type="button"
                className="auth-field__toggle"
                onClick={() => setVisible((current) => !current)}
                aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
                aria-pressed={visible}
              >
                {visible ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            )}
          </>
        )}
      </div>

      {error ? (
        <p className="auth-field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="auth-field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}
