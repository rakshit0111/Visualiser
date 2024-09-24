import React, { useState, useEffect } from 'react';
import { RefreshCw, Play, Pause, BarChart2, Sun, Moon } from 'lucide-react';

const ARRAY_SIZE = 50;
const MIN_VALUE = 5;
const MAX_VALUE = 1000;
const ANIMATION_SPEED_MS = 50;

const Visualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(ANIMATION_SPEED_MS);
  const [isStopped, setIsStopped] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const heapSort = async () => {
    const arr = [...array];

    const heapify = async (n, i) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && arr[left] > arr[largest]) largest = left;
      if (right < n && arr[right] > arr[largest]) largest = right;

      if (largest !== i) {
        if (isStopped) return;
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        setArray([...arr]);
        await sleep(speed);
        await heapify(n, largest);
      }
    };

    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      if (isStopped) return;
      await heapify(arr.length, i);
    }

    for (let i = arr.length - 1; i > 0; i--) {
      if (isStopped) return;
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      await sleep(speed);
      await heapify(i, 0);
    }
  };

  const countingSort = async () => {
    const arr = [...array];
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    const count = Array(range).fill(0);
    const output = Array(arr.length);

    for (let i = 0; i < arr.length; i++) {
      if (isStopped) return;
      count[arr[i] - min]++;
    }

    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
      if (isStopped) return;
      output[count[arr[i] - min] - 1] = arr[i];
      count[arr[i] - min]--;
      setArray([...output]);
      await sleep(speed);
    }
  };

  const insertionSort = async () => {
    const arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        if (isStopped) return;
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
        await sleep(speed);
      }
      arr[j + 1] = key;
      setArray([...arr]);
      await sleep(speed);
    }
  };

  const selectionSort = async () => {
    const arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (isStopped) return;
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
        await sleep(speed);
      }
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
      case 'selection': await selectionSort(); break;
      case 'insertion': await insertionSort(); break;
      case 'counting': await countingSort(); break;
      case 'heap': await heapSort(); break;
      default: break;
    }
    setSorting(false);
  };

  const stopSorting = () => {
    setIsStopped(true);
    setSorting(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`container mx-auto p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-br from-purple-50 to-indigo-100'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-purple-800'}`}>Sorting Algorithm Visualizer</h1>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-400 text-gray-800' : 'bg-gray-800 text-yellow-400'}`}
          aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
      
      <div className="mb-6 flex flex-wrap justify-center gap-4">
        <button 
          onClick={resetArray} 
          disabled={sorting}
          className={`flex items-center justify-center font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out disabled:opacity-50 shadow-md ${
            isDarkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
          aria-label="Generate New Array"
        >
          <RefreshCw className="mr-2" size={18} />
          New Array
        </button>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={sorting}
          className={`border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md ${
            isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-purple-300 text-purple-800'
          }`}
          aria-label="Select Sorting Algorithm"
        >
          <option value="bubble">Bubble Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="counting">Count Sort</option>
          <option value="heap">Heap Sort</option>
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
        <label className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-purple-800'}`}>Animation Speed</label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={sorting}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
            isDarkMode ? 'bg-gray-600' : 'bg-purple-200'
          }`}
          aria-label="Adjust Animation Speed"
        />
        <div className={`flex justify-between text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-purple-600'}`}>
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>

      <div className={`relative h-64 border rounded-lg overflow-hidden shadow-inner ${
        isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-purple-300'
      }`}>
        {array.map((value, idx) => (
          <div
            key={idx}
            style={{
              height: `${(value / MAX_VALUE) * 100}%`,
              width: `${100 / ARRAY_SIZE}%`,
              backgroundColor: isStopped 
                ? (isDarkMode ? '#4B5563' : '#D1D5DB')
                : (isDarkMode ? '#60A5FA' : '#8B5CF6'),
              position: 'absolute',
              bottom: 0,
              left: `${(idx / ARRAY_SIZE) * 100}%`,
              transition: 'height 0.3s ease-in-out',
            }}
            aria-label={`Bar ${idx + 1} with value ${value}`}
          ></div>
        ))}
      </div>

      <div className={`mt-6 text-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-purple-700'}`}>
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