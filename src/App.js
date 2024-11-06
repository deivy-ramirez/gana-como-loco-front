import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './components/Login'
import Register from './components/Register'
import Game from './components/Game'
import AdminPanel from './components/AdminPanel'
import AdminRegister from './components/AdminRegister'

export default function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4">
        <header className="w-full p-5 mx-auto flex justify-between items-center fixed top-0">
          <Link to="/" className="text-3xl font-bold text-white hover:text-yellow-300 transition-colors">
            Gana como Loco
          </Link>
          {isAuthenticated && (
            <Link
              to="/game"
              className="bg-yellow-400 hover:bg-yellow-300 text-purple-800 font-bold py-2 px-4 rounded-full transition-colors"
            >
              Jugar
            </Link>
          )}
        </header>
        <main className="w-full">
          <Routes>
            <Route index element={<Login />} />
            <Route path="/" element={isAuthenticated ? <Navigate to="/game" /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/game" element={isAuthenticated ? <Game /> : <Navigate to="/" />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/register" element={<AdminRegister />} />
          </Routes>
        </main>
        <footer className="mt-8 text-white text-sm">
          © 2024 Gana como Loco. Todos los derechos reservados.
        </footer>
      </div>
    </Router>
  )
}