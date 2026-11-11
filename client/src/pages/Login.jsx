import { useState } from 'react'
import { AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthField from '../components/auth/AuthField'
import AuthShell from '../components/auth/AuthShell'
import { campusImages } from '../data/campus'
import { loginStudent } from '../lib/authApi'
import { validateLogin } from '../lib/authValidation'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const registered = Boolean(location.state?.registered)
  const [values, setValues] = useState({
    email: location.state?.email || '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
    if (formError) setFormError('')
  }

  function handleBlur(event) {
    const { name } = event.target
    const nextErrors = validateLogin(values)
    setErrors((current) => ({ ...current, [name]: nextErrors[name] }))
  }

  function focusFirstError(nextErrors) {
    const firstField = Object.keys(nextErrors)[0]
    if (!firstField) return
    requestAnimationFrame(() => document.getElementById(firstField)?.focus())
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateLogin(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors)
      return
    }

    setSubmitting(true)
    setFormError('')

    try {
      await loginStudent({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      })

      navigate('/dashboard', { replace: true })
    } catch (error) {
      setFormError(error.message || 'We could not sign you in. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <AuthShell
      image={campusImages.aerial}
      imageClassName="auth-page__media--aerial"
      quote="There is more happening on campus than any one group chat can hold."
      attribution="Discover · Register · Belong"
    >
      <p className="auth-kicker">Welcome back</p>
      <h1 className="auth-title">Pick up where you left off.</h1>
      <p className="auth-lede">
        Sign in with your college email to see what is waiting on campus this week.
      </p>

      <form className="auth-form auth-form--compact" onSubmit={handleSubmit} noValidate aria-busy={submitting}>
        {registered && (
          <div className="auth-notice" role="status">
            <CheckCircle2 size={18} aria-hidden="true" />
            <p>Account created. Sign in to continue.</p>
          </div>
        )}

        {formError && (
          <div className="auth-alert" role="alert">
            <AlertCircle size={18} aria-hidden="true" />
            <p>{formError}</p>
          </div>
        )}

        <AuthField
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          placeholder="you@gat.ac.in"
          autoComplete="email"
          disabled={submitting}
        />

        <AuthField
          id="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          placeholder="Enter your password"
          autoComplete="current-password"
          disabled={submitting}
        />

        <button
          type="submit"
          className="lp-btn lp-btn--primary auth-submit"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <span className="auth-spinner" aria-hidden="true" />
              Signing in…
            </>
          ) : (
            <>
              Log in
              <ArrowRight size={17} aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <p className="auth-switch">
        New to CampusSphere?
        <Link to="/signup">Create an account</Link>
      </p>
    </AuthShell>
  )
}
