import React, { useState } from 'react';
import { WallCalculatorHeader, WallCalculatorForm, WallCalculatorResults, WallSelector } from './components/WallCalculator';

const App = () => {
  // Inicializar con null para que los campos estén vacíos al inicio
  const [walls, setWalls] = useState([{ 
    height: null, 
    width: null, 
    openings: [] 
  }]);

  const handleLayoutSelect = (layoutType) => {
    switch(layoutType) {
      case 'single':
        setWalls([{ height: null, width: null, openings: [] }]);
        break;
      case 'L':
        setWalls([
          { height: null, width: null, openings: [] },
          { height: null, width: null, openings: [] }
        ]);
        break;
      case 'U':
        setWalls([
          { height: null, width: null, openings: [] },
          { height: null, width: null, openings: [] },
          { height: null, width: null, openings: [] }
        ]);
        break;
      case 'square':
        setWalls([
          { height: null, width: null, openings: [] },
          { height: null, width: null, openings: [] },
          { height: null, width: null, openings: [] },
          { height: null, width: null, openings: [] }
        ]);
        break;
      default:
        setWalls([{ height: null, width: null, openings: [] }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <WallCalculatorHeader />
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <WallSelector onSelectLayout={handleLayoutSelect} />
            <WallCalculatorForm walls={walls} setWalls={setWalls} />
          </div>
          <div className="border-t border-gray-200 p-6 sm:p-8">
            <WallCalculatorResults walls={walls} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;