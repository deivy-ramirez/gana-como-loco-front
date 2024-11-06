import React, { useState, useEffect } from 'react'
import { loginAdmin, getUsers, getCodes, getAdminStats } from '../services/api'

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [users, setUsers] = useState([])
  const [codes, setCodes] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken')
    if (adminToken) {
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      fetchData()
    }
  }, [isLoggedIn])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [usersData, codesData, statsData] = await Promise.all([getUsers(), getCodes(), getAdminStats()])
      setUsers(usersData)
      setCodes(codesData)
      setStats(statsData)
    } catch (error) {
      console.error('Error al obtener datos:', error)
      setError('Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await loginAdmin({ username, password })
      localStorage.setItem('adminToken', response.token)
      setIsLoggedIn(true)
      setError('')
    } catch (err) {
      setError('Credenciales inválidas')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
  }

  if (!isLoggedIn) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">Acceso Administrativo</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
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
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="min-h-screen w-screen bg-white/95">
        <header className="bg-purple-600 text-white px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        </header>

        <nav className="flex bg-white border-b px-8">
          <button
            className={`px-8 py-4 text-lg font-medium ${
              activeTab === 'dashboard'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-500 hover:text-purple-600'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`px-8 py-4 text-lg font-medium ${
              activeTab === 'users'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-500 hover:text-purple-600'
            }`}
            onClick={() => setActiveTab('users')}
          >
            Usuarios
          </button>
          <button
            className={`px-8 py-4 text-lg font-medium ${
              activeTab === 'codes'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-500 hover:text-purple-600'
            }`}
            onClick={() => setActiveTab('codes')}
          >
            Códigos
          </button>
        </nav>

        {loading ? (
          <div className="flex justify-center items-center h-[calc(100vh-120px)]">
            <div className="text-xl">Cargando...</div>
          </div>
        ) : (
          <main className="p-8">
            {activeTab === 'dashboard' && stats && (
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-purple-500">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Usuarios Totales</h3>
                  <p className="text-4xl font-bold text-purple-600">{stats.totalUsers}</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Códigos Totales</h3>
                  <p className="text-4xl font-bold text-blue-600">{stats.totalCodes}</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-green-500">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Códigos Usados</h3>
                  <p className="text-4xl font-bold text-green-600">{stats.usedCodes}</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-yellow-500">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Total en Premios</h3>
                  <p className="text-4xl font-bold text-yellow-600">${stats.totalPrizeAmount.toLocaleString()}</p>
                </div>
              </section>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto w-full">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4">
                          Nombre
                        </th>
                        <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4">
                          Cédula
                        </th>
                        <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4">
                          Correo
                        </th>
                        <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4">
                          Fecha de Registro
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="px-8 py-4 text-sm text-gray-900">{user.nombre}</td>
                          <td className="px-8 py-4 text-sm text-gray-900">{user.cedula}</td>
                          <td className="px-8 py-4 text-sm text-gray-900">{user.correo}</td>
                          <td className="px-8 py-4 text-sm text-gray-900">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'codes' && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto w-full">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Código
                        </th>
                        <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Premio
                        </th>
                        <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Usuario
                        </th>
                        <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Cédula
                        </th>
                        <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Fecha de Uso
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {codes.map((code) => (
                        <tr key={code._id} className="hover:bg-gray-50">
                          <td className="px-8 py-4 text-sm text-gray-900">{code.codigo}</td>
                          <td className="px-8 py-4 text-sm text-gray-900">${code.premio.toLocaleString()}</td>
                          <td className="px-8 py-4 text-sm text-gray-900">
                            {code.usuario ? code.usuario.nombre : 'N/A'}
                          </td>
                          <td className="px-8 py-4 text-sm text-gray-900">
                            {code.usuario ? code.usuario.cedula : 'N/A'}
                          </td>
                          <td className="px-8 py-4 text-sm text-gray-900">
                            {code.fechaUso ? new Date(code.fechaUso).toLocaleDateString() : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        )}
      </div>
    </div>
  )
}