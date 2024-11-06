import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/api'

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    correo: '',
    password: '',
    fechaNacimiento: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(formData)
      navigate('/')
    } catch (err) {
      setError('Error en el registro. Por favor, intenta de nuevo.')
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">Registro</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre completo"
          required
          className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="text"
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          placeholder="Cédula"
          required
          className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
          className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
          className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors"
        >
          Registrarse
        </button>
      </form>
      <p className="mt-4 text-center">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/" className="text-purple-600 hover:underline">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  )
}