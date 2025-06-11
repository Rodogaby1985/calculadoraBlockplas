import React from 'react';

const WallCalculatorForm = ({ walls, setWalls }) => {
  // Función para manejar cambios en los campos de pared
  const handleWallChange = (index, e) => {
    const newWalls = [...walls];
    // Compatibilidad cross-browser para inputs numéricos
    const value = e.target.value;
    newWalls[index][e.target.name] = value === '' ? null : Number(value);
    setWalls(newWalls);
  };

  // Función para manejar cambios en los campos de aberturas
  const handleOpeningChange = (wallIndex, openingIndex, e) => {
    const newWalls = [...walls];
    const value = e.target.value;
    
    // Si es un select (tipo), no necesita conversión numérica
    if (e.target.name === 'type') {
      newWalls[wallIndex].openings[openingIndex][e.target.name] = value;
    } else {
      newWalls[wallIndex].openings[openingIndex][e.target.name] = value === '' ? null : Number(value);
    }
    
    setWalls(newWalls);
  };

  const addWall = () => {
    if (walls.length < 4) {
      setWalls([...walls, { 
        height: null,
        width: null,
        openings: [] 
      }]);
    }
  };

  const removeWall = (index) => {
    if (walls.length > 1) {
      const newWalls = walls.filter((_, i) => i !== index);
      setWalls(newWalls);
    }
  };

  const addOpening = (wallIndex) => {
    const newWalls = [...walls];
    // Valores predeterminados para puerta estándar
    newWalls[wallIndex].openings.push({
      type: 'door',
      height: 2.1, // Altura estándar de puerta
      width: 0.9   // Ancho estándar de puerta
    });
    setWalls(newWalls);
  };

  const removeOpening = (wallIndex, openingIndex) => {
    const newWalls = [...walls];
    newWalls[wallIndex].openings = newWalls[wallIndex].openings.filter((_, i) => i !== openingIndex);
    setWalls(newWalls);
  };

  // Prevenir envío de formulario al presionar Enter (común en móviles)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Opcional: mover el foco al siguiente campo
      const inputs = Array.from(document.querySelectorAll('input[type="number"]'));
      const index = inputs.indexOf(e.target);
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      } else {
        e.target.blur(); // Quitar el foco para cerrar el teclado en móviles
      }
    }
  };

  return (
    <div className="space-y-6">
      {walls.map((wall, wallIndex) => (
        <div key={wallIndex} className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-4">Pared {wallIndex + 1}</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Altura (m)</label>
              <input
                type="number"
                inputMode="decimal" // Mejor para teclados móviles
                name="height"
                value={wall.height === null ? '' : wall.height}
                onChange={(e) => handleWallChange(wallIndex, e)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Ej: 2.5"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ancho (m)</label>
              <input
                type="number"
                inputMode="decimal" // Mejor para teclados móviles
                name="width"
                value={wall.width === null ? '' : wall.width}
                onChange={(e) => handleWallChange(wallIndex, e)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Ej: 3.2"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-md font-medium">Aberturas</h4>
              <button
                type="button" // Explícito para evitar envío de formulario
                onClick={() => addOpening(wallIndex)}
                className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-lg hover:bg-green-200 transition-colors"
              >
                + Añadir abertura
              </button>
            </div>

            {wall.openings?.map((opening, openingIndex) => (
              <div key={openingIndex} className="p-4 bg-gray-50 rounded-lg mb-3">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                    <select
                      name="type"
                      value={opening.type}
                      onChange={(e) => handleOpeningChange(wallIndex, openingIndex, e)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="door">Puerta</option>
                      <option value="window">Ventana</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Altura (m)</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      name="height"
                      value={opening.height === null ? '' : opening.height}
                      onChange={(e) => handleOpeningChange(wallIndex, openingIndex, e)}
                      onKeyDown={handleKeyDown}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Ej: 2.1"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ancho (m)</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      name="width"
                      value={opening.width === null ? '' : opening.width}
                      onChange={(e) => handleOpeningChange(wallIndex, openingIndex, e)}
                      onKeyDown={handleKeyDown}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Ej: 0.9"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeOpening(wallIndex, openingIndex)}
                      className="w-full px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {walls.length > 1 && (
            <button
              type="button"
              onClick={() => removeWall(wallIndex)}
              className="mt-3 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              Eliminar Pared
            </button>
          )}
        </div>
      ))}
      {walls.length < 4 && (
        <button
          type="button"
          onClick={addWall}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Añadir otra pared
        </button>
      )}
    </div>
  );
};

export default WallCalculatorForm;