import React, { useState } from 'react';
import { verifyCode } from '../services/api';
import { useAuth } from '../context/AuthContext';

function Game() {
  const [codigo, setCodigo] = useState('');
  const [resultado, setResultado] = useState('');
  const { userId } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await verifyCode(codigo, userId);
      console.log("user_auth_data", data)
      setResultado(`¡Felicidades! Ganaste ${data.premio} pesos.`);
    } catch (error) {
      setResultado('Código inválido o ya usado.');
    }
  };

  return (
    <div className="game-container">
      <h2>Gana como loco</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Ingresa el código de 3 dígitos"
          maxLength="3"
          required
        />
        <button type="submit">Verificar</button>
      </form>
      {resultado && <p className="resultado">{resultado}</p>}
    </div>
  );
}

export default Game;