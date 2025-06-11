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

  // Packs de venta
  const PACK_DOUBLE_BRICKS = 60; // 60 ladrillos dobles = 1 m2
  const PACK_SINGLE_BRICKS = 30; // 30 ladrillos simples

  // Calcula el área neta de una pared (restando aberturas)
  const calculateWallArea = (wall) => {
    const wallHeight = wall.height || 0;
    const wallWidth = wall.width || 0;
    const wallArea = wallHeight * wallWidth;
    
    const openingsArea = wall.openings?.reduce((total, opening) => {
      const openingHeight = opening.height || 0;
      const openingWidth = opening.width || 0;
      return total + (openingHeight * openingWidth);
    }, 0) || 0;
    
    return wallArea - openingsArea;
  };

  // Función para calcular el área total
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
    const wallHeight = wall.height || 0;
    const heightBricks = wallHeight / BRICK_SINGLE.width;
    
    const openingBricks = wall.openings?.reduce((total, opening) => {
      const openingHeight = opening.height || 0;
      return total + (openingHeight / BRICK_SINGLE.width);
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

  // Calcular packs de ladrillos dobles
  const m2DoubleBricks = bricksNeeded.double / PACK_DOUBLE_BRICKS;
  const packsDoubleBricks = Math.ceil(m2DoubleBricks);

  // Calcular packs de ladrillos simples
  const packsSingleBricks = Math.ceil(bricksNeeded.single / PACK_SINGLE_BRICKS);

  const handleGoToShop = () => {
    window.open('https://blockplas.com.ar/tienda/', '_blank', 'noopener,noreferrer');
  };

  const handleBuyDoubleBricks = () => {
    window.open('https://blockplas.com.ar/producto/ladrillos-plasticos-reciclados-blockplas-x-mts2/', '_blank', 'noopener,noreferrer');
  };

  const handleBuySingleBricks = () => {
    window.open('https://blockplas.com.ar/producto/ladrillos-simples-plasticos-reciclados-blockplas-x-mts2/', '_blank', 'noopener,noreferrer');
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
          {/* Texto "Vas a necesitar:" más grande y en negrita */}
          <h4 className="text-xl font-bold mb-3">Vas a necesitar:</h4>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 font-semibold">Ladrillos Dobles:</p>
              <p className="text-xl font-bold">{packsDoubleBricks} m² ({packsDoubleBricks * PACK_DOUBLE_BRICKS} ladrillos dobles)</p>
              <p className="text-xs text-gray-500">Se venden en packs de {PACK_DOUBLE_BRICKS} ladrillos dobles (1 m²)</p>
              <button
                type="button"
                onClick={handleBuyDoubleBricks}
                className="w-full mt-3 bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors shadow-sm"
              >
                Comprar Ladrillos Dobles
              </button>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600 font-semibold">Ladrillos Simples:</p>
              <p className="text-xl font-bold">{packsSingleBricks * PACK_SINGLE_BRICKS} ladrillos simples ({packsSingleBricks} pack{packsSingleBricks !== 1 ? 's' : ''})</p>
              <p className="text-xs text-gray-500">Se venden en packs de {PACK_SINGLE_BRICKS} ladrillos simples</p>
              <button
                type="button"
                onClick={handleBuySingleBricks}
                className="w-full mt-3 bg-green-700 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors shadow-sm"
              >
                Comprar Ladrillos Simples
              </button>
            </div>
          </div>
        </div>

        {/* Botón "Ir a la Tienda" */}
        <button
          type="button"
          onClick={handleGoToShop}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          Ir a la Tienda
        </button>
      </div>
    </div>
  );
};

export default WallCalculatorResults;