import React, { useState, useEffect } from 'react';

const ARRAY_SIZE = 50;
const MIN_VALUE = 5;
const MAX_VALUE = 100;
const ANIMATION_SPEED_MS = 10;

const Visualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(ANIMATION_SPEED_MS);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = Array.from({ length: ARRAY_SIZE }, () => randomIntFromInterval(MIN_VALUE, MAX_VALUE));
    setArray(newArray);
  };

  const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const bubbleSort = async () => {
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(speed);
        }
      }
    }
  };

  const quickSort = async () => { /* Implementation */ };
  const mergeSort = async () => { /* Implementation */ };
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  const startSorting = async () => {
    setSorting(true);
    switch (algorithm) {
      case 'bubble': await bubbleSort(); break;
      case 'quick': await quickSort(); break;
      case 'merge': await mergeSort(); break;
      default: break;
    }
    setSorting(false);
  };

  return (
    <div className="container mx-auto p-4 sm:p-2">
      <h1 className="text-3xl font-bold mb-4 text-center">Sorting Visualizer</h1>
      <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
        <button 
          onClick={resetArray} 
          disabled={sorting}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0"
        >
          Generate New Array
        </button>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={sorting}
          className="bg-white border border-gray-300 rounded-md py-2 px-4 mb-2 sm:mb-0"
        >
          <option value="bubble">Bubble Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="merge">Merge Sort</option>
        </select>
        <button 
          onClick={startSorting} 
          disabled={sorting}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0"
        >
          Start Sorting
        </button>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Animation Speed</label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={sorting}
          className="w-full"
        />
      </div>
      <div className="flex items-end h-64 overflow-hidden">
        {array.map((value, idx) => (
          <div
            key={idx}
            style={{
              height: `${(value / MAX_VALUE) * 100}%`,
              width: `${100 / ARRAY_SIZE}%`
            }}
            className="bg-blue-500 transition-all duration-300"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Visualizer;
