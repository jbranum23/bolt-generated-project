import { useQuery, useMutation } from '@tanstack/react-query'
import client from '../api/client'
import useStore from '../store/useStore'

export function useAuth() {
  const { setUser } = useStore()

  const login = useMutation(
    credentials => client.post('/auth/login', credentials),
    {
      onSuccess: ({ data }) => {
        localStorage.setItem('token', data.token)
        setUser(data.user)
      }
    }
  )

  const register = useMutation(
    userData => client.post('/auth/register', userData),
    {
      onSuccess: ({ data }) => {
        localStorage.setItem('token', data.token)
        setUser(data.user)
      }
    }
  )

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return {
    login,
    register,
    logout
  }
}
