const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateSignup(values) {
  const errors = {}
  const fullName = values.fullName.trim()

  if (!fullName) {
    errors.fullName = 'Enter your full name.'
  } else if (fullName.length < 2) {
    errors.fullName = 'Your name needs at least 2 characters.'
  }

  if (!values.email.trim()) {
    errors.email = 'Enter your college email address.'
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.college.trim()) {
    errors.college = 'Enter your college name.'
  }

  if (!values.department) {
    errors.department = 'Select your department.'
  }

  if (!values.academicYear) {
    errors.academicYear = 'Select your academic year.'
  }

  if (!values.password) {
    errors.password = 'Create a password.'
  } else if (values.password.length < 8) {
    errors.password = 'Use at least 8 characters.'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm your password.'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'The passwords do not match.'
  }

  return errors
}

export function validateLogin(values) {
  const errors = {}

  if (!values.email.trim()) {
    errors.email = 'Enter your email address.'
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.password) {
    errors.password = 'Enter your password.'
  }

  return errors
}
