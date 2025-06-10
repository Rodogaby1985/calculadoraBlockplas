import React, { useState } from 'react';
import { WallCalculatorHeader, WallCalculatorForm, WallCalculatorResults, WallSelector } from './components/WallCalculator';

const App = () => {
  const [walls, setWalls] = useState([{ 
    height: 0, 
    width: 0, 
    openings: [] 
  }]);

  const handleLayoutSelect = (layoutType) => {
    switch(layoutType) {
      case 'single':
        setWalls([{ height: 0, width: 0, openings: [] }]);
        break;
      case 'L':
        setWalls([
          { height: 0, width: 0, openings: [] },
          { height: 0, width: 0, openings: [] }
        ]);
        break;
      case 'U':
        setWalls([
          { height: 0, width: 0, openings: [] },
          { height: 0, width: 0, openings: [] },
          { height: 0, width: 0, openings: [] }
        ]);
        break;
      case 'square':
        setWalls([
          { height: 0, width: 0, openings: [] },
          { height: 0, width: 0, openings: [] },
          { height: 0, width: 0, openings: [] },
          { height: 0, width: 0, openings: [] }
        ]);
        break;
      default:
        setWalls([{ height: 0, width: 0, openings: [] }]);
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

// DONE