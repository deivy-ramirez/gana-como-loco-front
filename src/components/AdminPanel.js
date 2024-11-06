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
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
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
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="min-h-screen w-full bg-white/95 p-4">
        <header className="bg-purple-600 text-white px-6 py-4 rounded-t-lg shadow-lg flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-[calc(100vh-120px)]">
            <div className="text-xl text-purple-600">Cargando...</div>
          </div>
        ) : (
          <div>
            <div className="flex mb-6 bg-white border-b overflow-x-auto">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 ${
                  activeTab === 'dashboard'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 ${
                  activeTab === 'users'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Usuarios
              </button>
              <button
                onClick={() => setActiveTab('codes')}
                className={`px-4 py-2 ${
                  activeTab === 'codes'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Códigos
              </button>
            </div>

            {activeTab === 'dashboard' && stats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-lg shadow-md text-white">
                  <h3 className="text-lg font-semibold mb-2">Usuarios Totales</h3>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg shadow-md text-white">
                  <h3 className="text-lg font-semibold mb-2">Códigos Totales</h3>
                  <p className="text-3xl font-bold">{stats.totalCodes}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg shadow-md text-white">
                  <h3 className="text-lg font-semibold mb-2">Códigos Usados</h3>
                  <p className="text-3xl font-bold">{stats.usedCodes}</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-4 rounded-lg shadow-md text-white">
                  <h3 className="text-lg font-semibold mb-2">Total en Premios</h3>
                  <p className="text-3xl font-bold">${stats.totalPrizeAmount.toLocaleString()}</p>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <h2 className="text-2xl font-bold text-purple-800 p-4 border-b">Información de Usuarios</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cédula</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Registro</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td className="px-6 py-4 whitespace-nowrap">{user.nombre}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{user.cedula}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{user.correo}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'codes' && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <h2 className="text-2xl font-bold text-purple-800 p-4 border-b">Información de Códigos</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premio</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cédula</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Uso</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {codes.map((code) => (
                        <tr key={code._id}>
                          <td className="px-6 py-4 whitespace-nowrap">{code.codigo}</td>
                          <td className="px-6 py-4 whitespace-nowrap">${code.premio.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{code.usuario ? code.usuario.nombre : 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{code.usuario ? code.usuario.cedula : 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {code.fechaUso ? new Date(code.fechaUso).toLocaleDateString() : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}