import { useState } from 'react'
import { AlertCircle, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import AuthField from '../components/auth/AuthField'
import AuthShell from '../components/auth/AuthShell'
import { campusImages } from '../data/campus'
import { signupStudent } from '../lib/authApi'
import { validateSignup } from '../lib/authValidation'

const initialValues = {
  fullName: '',
  email: '',
  college: 'Global Academy of Technology',
  department: '',
  academicYear: '',
  password: '',
  confirmPassword: '',
}

const departments = [
  'Computer Science',
  'Information Science',
  'AI & Machine Learning',
  'Electronics & Communication',
  'Electrical & Electronics',
  'Mechanical Engineering',
  'Civil Engineering',
  'Architecture',
  'Other',
]

const academicYears = ['1st year', '2nd year', '3rd year', '4th year']

export default function Signup() {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
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
    const nextErrors = validateSignup(values)
    setErrors((current) => ({ ...current, [name]: nextErrors[name] }))
  }

  function focusFirstError(nextErrors) {
    const firstField = Object.keys(nextErrors)[0]
    if (!firstField) return
    requestAnimationFrame(() => document.getElementById(firstField)?.focus())
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateSignup(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors)
      return
    }

    setSubmitting(true)
    setFormError('')

    try {
      await signupStudent({
        fullName: values.fullName.trim(),
        email: values.email.trim().toLowerCase(),
        college: values.college.trim(),
        department: values.department,
        academicYear: values.academicYear,
        password: values.password,
      })

      navigate('/login', {
        replace: true,
        state: { registered: true, email: values.email.trim().toLowerCase() },
      })
    } catch (error) {
      setFormError(
        error.message || 'We could not create your account. Please try again.',
      )
      setSubmitting(false)
    }
  }

  return (
    <AuthShell
      image={campusImages.courtyard}
      imageClassName="auth-page__media--portrait"
      quote="The best parts of college are rarely on the timetable."
      attribution="Campus life · Global Academy of Technology"
    >
      <p className="auth-kicker">Create your account</p>
      <h1 className="auth-title">Start with your campus.</h1>
      <p className="auth-lede">
        One account for the workshops, festivals and opportunities that make GAT feel
        bigger than a timetable.
      </p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate aria-busy={submitting}>
        {formError && (
          <div className="auth-alert" role="alert">
            <AlertCircle size={18} aria-hidden="true" />
            <p>{formError}</p>
          </div>
        )}

        <div className="auth-grid">
          <AuthField
            id="fullName"
            label="Full name"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.fullName}
            placeholder="Aarav Rao"
            autoComplete="name"
            disabled={submitting}
            className="auth-field--full"
          />

          <AuthField
            id="email"
            label="College email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            placeholder="you@gat.ac.in"
            autoComplete="email"
            disabled={submitting}
            className="auth-field--full"
            hint="Use the email your college has on record."
          />

          <AuthField
            id="college"
            label="College"
            value={values.college}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.college}
            autoComplete="organization"
            disabled={submitting}
            className="auth-field--full"
          />

          <AuthField
            id="department"
            label="Department"
            value={values.department}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.department}
            options={departments}
            placeholder="Select department"
            disabled={submitting}
          />

          <AuthField
            id="academicYear"
            label="Academic year"
            value={values.academicYear}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.academicYear}
            options={academicYears}
            placeholder="Select year"
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
            placeholder="At least 8 characters"
            autoComplete="new-password"
            disabled={submitting}
            hint="Use at least 8 characters."
          />

          <AuthField
            id="confirmPassword"
            label="Confirm password"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword}
            placeholder="Repeat your password"
            autoComplete="new-password"
            disabled={submitting}
          />
        </div>

        <button
          type="submit"
          className="lp-btn lp-btn--primary auth-submit"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <span className="auth-spinner" aria-hidden="true" />
              Creating account…
            </>
          ) : (
            <>
              Create account
              <ArrowRight size={17} aria-hidden="true" />
            </>
          )}
        </button>

        <p className="auth-form__note">
          Your account uses your college details. Nothing is posted publicly.
        </p>
      </form>

      <p className="auth-switch">
        Already have an account?
        <Link to="/login">Log in</Link>
      </p>
    </AuthShell>
  )
}
