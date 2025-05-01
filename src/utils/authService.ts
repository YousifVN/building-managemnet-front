import axios from 'axios'

export async function authenticate(): Promise<string> {
  try {
    const email = import.meta.env.VITE_FIREBASE_EMAIL
    const password = import.meta.env.VITE_FIREBASE_PASSWORD
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY

    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    )
    const token = response.data.idToken
    localStorage.setItem('authToken', token) // Store the token in localStorage
    return token
  } catch (error: any) {
    console.error('Error authenticating:', error.response?.data || error.message)
    throw error
  }
}
