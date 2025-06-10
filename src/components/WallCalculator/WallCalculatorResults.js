import React from 'react';

const WallCalculatorResults = ({ walls }) => {
  // Tamaños de ladrillos en metros
  const BRICK_DOUBLE = {
    length: 0.2,   // 20 cm
    height: 0.1,   // 10 cm
    width: 0.08    // 8 cm
  };

  const BRICK_SINGLE = {
    length: 0.1,   // 10 cm
    height: 0.1,   // 10 cm
    width: 0.08    // 8 cm
  };

  // Calcula el área neta de una pared (restando aberturas)
  const calculateWallArea = (wall) => {
    const wallArea = wall.height * wall.width;
    const openingsArea = wall.openings?.reduce((total, opening) => {
      return total + (opening.height * opening.width);
    }, 0) || 0;
    
    return wallArea - openingsArea;
  };

  // Función agregada para calcular el área total
  const calculateTotalArea = () => {
    return walls.reduce((total, wall) => {
      return total + calculateWallArea(wall);
    }, 0);
  };

  // Calcula ladrillos dobles necesarios para una pared
  const calculateDoubleBricksForWall = (wall) => {
    const wallArea = calculateWallArea(wall);
    const brickArea = BRICK_DOUBLE.length * BRICK_DOUBLE.height;
    const bricks = wallArea / brickArea;
    return Math.ceil(bricks * 1.1); // 10% de desperdicio
  };

  // Calcula ladrillos simples necesarios (altura/0.08)
  const calculateSingleBricksForWall = (wall) => {
    // Ladrillos para altura de pared
    const heightBricks = wall.height / BRICK_SINGLE.width;
    
    // Ladrillos para aberturas (altura abertura/0.08)
    const openingBricks = wall.openings?.reduce((total, opening) => {
      return total + (opening.height / BRICK_SINGLE.width);
    }, 0) || 0;
    
    const totalSingleBricks = heightBricks + openingBricks;
    return Math.ceil(totalSingleBricks * 1.1); // 10% de desperdicio
  };

  // Totales de ladrillos para todas las paredes
  const calculateTotalBricks = () => {
    return walls.reduce((totals, wall) => {
      totals.double += calculateDoubleBricksForWall(wall);
      totals.single += calculateSingleBricksForWall(wall);
      return totals;
    }, { double: 0, single: 0 });
  };

  const totalArea = calculateTotalArea();
  const bricksNeeded = calculateTotalBricks();

  // Función para mostrar detalles de cálculo
  const renderCalculationDetails = () => {
    return walls.map((wall, index) => {
      const heightBricks = wall.height / BRICK_SINGLE.width;
      const openingBricks = wall.openings?.reduce((total, opening) => {
        return total + (opening.height / BRICK_SINGLE.width);
      }, 0) || 0;
      
      return (
        <div key={index} className="mt-3 p-3 bg-gray-50 rounded-lg">
          <p className="font-medium">Pared {index + 1}:</p>
          <p className="text-sm">• Ladrillos simples altura: {heightBricks.toFixed(1)} ({wall.height}m / 0.08m)</p>
          {wall.openings?.length > 0 && (
            <p className="text-sm">• Ladrillos simples aberturas: {openingBricks.toFixed(1)}</p>
          )}
          <p className="text-sm font-medium mt-1">
            Total pared {index + 1}: {Math.ceil((heightBricks + openingBricks) * 1.1)} (incluye 10%)
          </p>
        </div>
      );
    });
  };

  const handleArmarPedidoClick = () => {
    window.open('https://blockplas.com.ar/tienda/', '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-inner">
      <h3 className="text-xl font-semibold mb-4">Resultados</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Área total:</p>
            <p className="text-2xl font-bold">{totalArea.toFixed(2)} m²</p>
          </div>
          <div>
            <p className="text-gray-600">Paredes:</p>
            <p className="text-2xl font-bold">{walls.length}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <h4 className="font-medium mb-3">Ladrillos necesarios</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">Dobles (10x20x8 cm)</p>
              <p className="text-xl font-bold">{bricksNeeded.double}</p>
              <p className="text-xs text-gray-500">Estructura principal</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600">Simples (10x10x8 cm)</p>
              <p className="text-xl font-bold">{bricksNeeded.single}</p>
              <p className="text-xs text-gray-500">Terminaciones</p>
            </div>
          </div>
          <div className="mt-3 p-2 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-700">
              <span className="font-medium">Total:</span> {bricksNeeded.double + bricksNeeded.single} ladrillos (incluye 10% desperdicio)
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <h4 className="font-medium mb-2">Detalles de cálculo</h4>
          <p className="text-sm text-gray-600 mb-3">
            Ladrillos simples = (Altura pared / 0.08m) + (Altura abertura / 0.08m por cada abertura)
          </p>
          {renderCalculationDetails()}
        </div>

        {/* Botón "Armar Pedido" */}
        <button
          onClick={handleArmarPedidoClick}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          Armar Pedido
        </button>
      </div>
    </div>
  );
};

export default WallCalculatorResults;