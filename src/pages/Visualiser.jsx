import React, { useState, useEffect } from 'react';
import { RefreshCw, Play, Pause, BarChart2 } from 'lucide-react';

const ARRAY_SIZE = 50;
const MIN_VALUE = 5;
const MAX_VALUE = 100;
const ANIMATION_SPEED_MS = 10;

const Visualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(ANIMATION_SPEED_MS);
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = Array.from({ length: ARRAY_SIZE }, () => randomIntFromInterval(MIN_VALUE, MAX_VALUE));
    setArray(newArray);
    setIsStopped(false);
  };

  const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const bubbleSort = async () => {
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (isStopped) return;
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(speed);
        }
      }
    }
  };

  const quickSort = async () => {
    const arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1);
  };

  const quickSortHelper = async (arr, start, end) => {
    if (start >= end) return;
    let pivot = arr[end];
    let i = start - 1;
    for (let j = start; j < end; j++) {
      if (isStopped) return;
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(speed);
      }
    }
    [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];
    setArray([...arr]);
    await sleep(speed);
    const pivotIndex = i + 1;
    await quickSortHelper(arr, start, pivotIndex - 1);
    await quickSortHelper(arr, pivotIndex + 1, end);
  };

  const mergeSort = async () => {
    const arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);
  };

  const mergeSortHelper = async (arr, start, end) => {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    await mergeSortHelper(arr, start, mid);
    await mergeSortHelper(arr, mid + 1, end);
    await merge(arr, start, mid, end);
  };

  const merge = async (arr, start, mid, end) => {
    const leftArr = arr.slice(start, mid + 1);
    const rightArr = arr.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    while (i < leftArr.length && j < rightArr.length) {
      if (isStopped) return;
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      k++;
      setArray([...arr]);
      await sleep(speed);
    }
    while (i < leftArr.length) {
      if (isStopped) return;
      arr[k] = leftArr[i];
      i++;
      k++;
      setArray([...arr]);
      await sleep(speed);
    }
    while (j < rightArr.length) {
      if (isStopped) return;
      arr[k] = rightArr[j];
      j++;
      k++;
      setArray([...arr]);
      await sleep(speed);
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const startSorting = async () => {
    setSorting(true);
    setIsStopped(false);
    switch (algorithm) {
      case 'bubble': await bubbleSort(); break;
      case 'quick': await quickSort(); break;
      case 'merge': await mergeSort(); break;
      default: break;
    }
    setSorting(false);
  };

  const stopSorting = () => {
    setIsStopped(true);
    setSorting(false);
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">Sorting Algorithm Visualizer</h1>
      
      <div className="mb-6 flex flex-wrap justify-center gap-4">
        <button 
          onClick={resetArray} 
          disabled={sorting}
          className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out disabled:opacity-50 shadow-md"
          aria-label="Generate New Array"
        >
          <RefreshCw className="mr-2" size={18} />
          New Array
        </button>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={sorting}
          className="bg-white border border-purple-300 rounded-full py-2 px-4 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
          aria-label="Select Sorting Algorithm"
        >
          <option value="bubble">Bubble Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="merge">Merge Sort</option>
        </select>
        <button 
          onClick={sorting ? stopSorting : startSorting}
          className={`flex items-center justify-center font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out shadow-md ${
            sorting
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
          aria-label={sorting ? "Stop Sorting" : "Start Sorting"}
        >
          {sorting ? <Pause className="mr-2" size={18} /> : <Play className="mr-2" size={18} />}
          {sorting ? 'Stop' : 'Start'} Sorting
        </button>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-purple-800">Animation Speed</label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={sorting}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
          aria-label="Adjust Animation Speed"
        />
        <div className="flex justify-between text-xs text-purple-600 mt-1">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>

      <div className="relative h-64 bg-white border border-purple-300 rounded-lg overflow-hidden shadow-inner">
        {array.map((value, idx) => (
          <div
            key={idx}
            style={{
              height: `${(value / MAX_VALUE) * 100}%`,
              width: `${100 / ARRAY_SIZE}%`,
              backgroundColor: isStopped ? '#D1D5DB' : '#8B5CF6',
              position: 'absolute',
              bottom: 0,
              left: `${(idx / ARRAY_SIZE) * 100}%`,
              transition: 'height 0.3s ease-in-out',
            }}
            aria-label={`Bar ${idx + 1} with value ${value}`}
          ></div>
        ))}
      </div>

      <div className="mt-6 text-center text-sm text-purple-700">
        <p>Array Size: {ARRAY_SIZE} | Min Value: {MIN_VALUE} | Max Value: {MAX_VALUE}</p>
        <p className="mt-2">
          <BarChart2 className="inline-block mr-2" size={18} />
          Current Algorithm: {algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort
        </p>
      </div>
    </div>
  );
};

export default Visualizer;