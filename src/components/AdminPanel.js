import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [codes, setCodes] = useState([]);
  const [error, setError] = useState('');

  const fetchCodes = async () => {
    try {
      const adminKey = localStorage.getItem('adminKey'); // Asume que guardas la clave de admin en localStorage
      const response = await axios.get('https://gana-como-loco-back.vercel.app/api/game/all-codes', {
        headers: { 'x-admin-key': adminKey }
      });
      setCodes(response.data);
    } catch (err) {
      setError('Error al obtener los códigos');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  const handleGenerateCodes = async () => {
    try {
      const adminKey = localStorage.getItem('adminKey');
      await axios.post('https://gana-como-loco-back.vercel.app/api/game/generate-codes', {}, {
        headers: { 'x-admin-key': adminKey }
      });
      alert('Códigos generados exitosamente');
      // Recargar los códigos después de generarlos
      fetchCodes();
    } catch (err) {
      setError('Error al generar los códigos');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Panel de Administrador</h1>
      {error && <p className="error">{error}</p>}
      <button onClick={handleGenerateCodes}>Generar Códigos</button>
      <h2>Códigos Promocionales</h2>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Premio</th>
            <th>Usado</th>
            <th>Usado Por</th>
          </tr>
        </thead>
        <tbody>
          {codes.map(code => (
            <tr key={code._id}>
              <td>{code.codigo}</td>
              <td>{code.premio}</td>
              <td>{code.usado ? 'Sí' : 'No'}</td>
              <td>{code.usadoPor || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
