import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerAdmin } from '../services/api'

export default function AdminRegister() {
  const [formData, setFormData] = useState({
    username: '',
    nombre: '',
    cedula: '',
    correo: '',
    password: '',
    fechaNacimiento: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    setError('')

    try {
      await registerAdmin(formData)
      alert('Administrador registrado exitosamente')
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Error en el registro del administrador')
    } finally {
      setLoading(false)
    }
  }

  return (
  <section className='flex items-center justify-center max-w-md'>
    <div className="bg-white p-8 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">Registro de Administrador</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nombre de usuario"
          required
          className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
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
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Registrando...' : 'Registrar Administrador'}
        </button>
      </form>
    </div>
    </section>
  )
}