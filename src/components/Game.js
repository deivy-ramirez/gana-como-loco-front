import React, { useState } from 'react'
import { verifyCode } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Game() {
  const [codigo, setCodigo] = useState('')
  const [resultado, setResultado] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const authData = JSON.parse(localStorage.getItem('authData') || '{}')
      const userId = authData.userId
      const data = await verifyCode(codigo, userId)
      setResultado(`¡Felicidades! Ganaste ${data.premio} pesos.`)
    } catch (error) {
      setResultado('Código inválido o ya usado.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">Gana como loco</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Ingresa el código de 3 dígitos"
          maxLength={3}
          required
          className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-yellow-400 text-purple-800 py-2 rounded hover:bg-yellow-300 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Verificando...' : 'Verificar'}
        </button>
      </form>
      {resultado && (
        <p
          className={`mt-4 p-3 rounded ${
            resultado.includes('Felicidades') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {resultado}
        </p>
      )}
    </div>
  )
}