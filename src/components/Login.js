import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login } from '../services/api'

export default function Login() {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setAuthData } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await login(correo, password)
      setAuthData(data)
      localStorage.setItem('authData', JSON.stringify(data))
      navigate('/game')
    } catch (err) {
      setError('Credenciales inválidas')
    }
  }

  return (
    <section className="flex items-center justify-center">
      <div className="bg-white max-w-md md:min-w-[30rem] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo electrónico"
            required
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-4 text-center">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-purple-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </section>
  )
}