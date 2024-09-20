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
    <div className="container mx-auto p-4 sm:p-2">
      
      <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
        <button 
          onClick={resetArray} 
          disabled={sorting}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0"
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
        <button 
          onClick={stopSorting} 
          disabled={!sorting}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Stop Sorting
        </button>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Move slider rightwards to slow down</label>
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
              width: `${100 / ARRAY_SIZE}%`,
              backgroundColor: isStopped ? 'gray' : 'teal'
            }}
            className="transition-all duration-300"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Visualizer;
