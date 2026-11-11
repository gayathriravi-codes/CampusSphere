const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export class AuthApiError extends Error {
  constructor(message, status = 0) {
    super(message)
    this.name = 'AuthApiError'
    this.status = status
  }
}

async function postAuth(path, payload) {
  let response

  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    })
  } catch {
    throw new AuthApiError(
      'We could not reach the authentication service. Check your connection and try again.',
    )
  }

  const isJson = response.headers.get('content-type')?.includes('application/json')
  const data = isJson ? await response.json().catch(() => null) : null

  if (!response.ok) {
    if (response.status >= 500) {
      throw new AuthApiError(
        'The authentication service is not available yet. Please try again later.',
        response.status,
      )
    }

    throw new AuthApiError(
      data?.message || 'That request could not be completed. Check your details and try again.',
      response.status,
    )
  }

  if (!data && response.status !== 204) {
    throw new AuthApiError(
      'The authentication service returned an unexpected response. Please try again later.',
      response.status,
    )
  }

  return data
}

export function signupStudent(payload) {
  return postAuth('/api/auth/signup', payload)
}

export function loginStudent(payload) {
  return postAuth('/api/auth/login', payload)
}
