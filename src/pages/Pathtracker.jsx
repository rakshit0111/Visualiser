import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Network, DataSet } from 'vis-network/standalone';
import { Plus, Play, MapPin, Target, GitBranch, Sun, Moon } from 'lucide-react';

const Pathtracker = () => {
  const [algorithm, setAlgorithm] = useState('dijkstra');
  const [graph, setGraph] = useState({});
  const [source, setSource] = useState('');
  const [end, setEnd] = useState('');
  const [result, setResult] = useState(null);
  const [edgeInput, setEdgeInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addEdge = (from, to, weight) => {
    setGraph((prevGraph) => ({
      ...prevGraph,
      [from]: { ...(prevGraph[from] || {}), [to]: parseInt(weight) },
      [to]: { ...(prevGraph[to] || {}), [from]: parseInt(weight) },
    }));
  };

  const handleAddEdge = (e) => {
    e.preventDefault();
    const [from, to, weight] = edgeInput.split(',');
    addEdge(from.trim(), to.trim(), weight.trim());
    setEdgeInput('');
  };

  const dijkstra = (graph, start, end) => {
    const distances = {};
    const previous = {};
    const queue = new Set();

    Object.keys(graph).forEach((node) => {
      distances[node] = Infinity;
      previous[node] = null;
      queue.add(node);
    });

    distances[start] = 0;

    while (queue.size > 0) {
      const currentNode = Array.from(queue).reduce((a, b) => (distances[a] < distances[b] ? a : b));
      if (currentNode === end) break;

      queue.delete(currentNode);

      for (const neighbor in graph[currentNode]) {
        const alt = distances[currentNode] + graph[currentNode][neighbor];
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = currentNode;
        }
      }
    }

    const path = [];
    for (let at = end; at !== null; at = previous[at]) {
      path.push(at);
    }
    path.reverse();

    return { distance: distances[end], path };
  };

  const floydWarshall = (graph) => {
    const dist = {};
    const next = {};

    const nodes = Object.keys(graph);

    nodes.forEach((node) => {
      dist[node] = {};
      next[node] = {};
      nodes.forEach((neighbor) => {
        dist[node][neighbor] = Infinity;
        if (node === neighbor) dist[node][neighbor] = 0;
        if (graph[node] && graph[node][neighbor]) {
          dist[node][neighbor] = graph[node][neighbor];
          next[node][neighbor] = neighbor;
        }
      });
    });

    for (const k of nodes) {
      for (const i of nodes) {
        for (const j of nodes) {
          if (dist[i][j] > dist[i][k] + dist[k][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
            next[i][j] = next[i][k];
          }
        }
      }
    }

    return { dist, next };
  };

  const bellmanFord = (graph, start) => {
    const distances = {};
    const previous = {};

    Object.keys(graph).forEach((node) => {
      distances[node] = Infinity;
      previous[node] = null;
    });

    distances[start] = 0;

    for (let i = 0; i < Object.keys(graph).length - 1; i++) {
      for (const u in graph) {
        for (const v in graph[u]) {
          const alt = distances[u] + graph[u][v];
          if (alt < distances[v]) {
            distances[v] = alt;
            previous[v] = u;
          }
        }
      }
    }

    const path = [];
    for (let at = end; at !== null; at = previous[at]) {
      path.push(at);
    }
    path.reverse();

    return { distance: distances[end], path };
  };

  const findPath = () => {
    let pathResult;
    if (algorithm === 'dijkstra') {
      pathResult = dijkstra(graph, source, end);
    } else if (algorithm === 'floydWarshall') {
      const { dist, next } = floydWarshall(graph);
      const totalDistance = dist[source][end];
      const path = [];
      for (let at = end; at !== null; at = next[source][at]) {
        path.push(at);
      }
      path.reverse();
      pathResult = { distance: totalDistance, path };
    } else if (algorithm === 'bellmanFord') {
      pathResult = bellmanFord(graph, source);
    }
    setResult(pathResult);
  };

  const graphData = () => {
    const nodes = [];
    const edges = [];

    Object.entries(graph).forEach(([node, neighbors]) => {
      nodes.push({ id: node, label: node });
      Object.entries(neighbors).forEach(([neighbor, weight]) => {
        edges.push({ from: node, to: neighbor, label: weight });
      });
    });

    return { nodes, edges };
  };

  const drawGraph = () => {
    const { nodes, edges } = graphData();
    const container = document.getElementById('graph');
    if (container) {
      const data = { nodes: new DataSet(nodes), edges: new DataSet(edges) };
      const options = { 
        physics: false,
        nodes: {
          color: {
            background: isDarkMode ? '#6366F1' : '#4F46E5',
            border: isDarkMode ? '#4F46E5' : '#3730A3',
            highlight: {
              background: isDarkMode ? '#818CF8' : '#6366F1',
              border: isDarkMode ? '#6366F1' : '#4F46E5'
            }
          },
          font: { color: isDarkMode ? '#E5E7EB' : '#FFFFFF' }
        },
        edges: {
          color: {
            color: isDarkMode ? '#6B7280' : '#9CA3AF',
            highlight: isDarkMode ? '#9CA3AF' : '#6B7280'
          },
          font: { color: isDarkMode ? '#D1D5DB' : '#4B5563' }
        }
      };
      new Network(container, data, options);
    }
  };

  useEffect(() => {
    drawGraph();
  }, [graph, isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`p-6 min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-50 to-blue-100 text-gray-900'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-indigo-800'}`}>Graph Visualiser</h1>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-indigo-600 text-white'}`}
          aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
      
      <div className={`max-w-4xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
        <div className="mb-6">
          <form onSubmit={handleAddEdge} className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Add edge (format: from,to,weight)"
              value={edgeInput}
              onChange={(e) => setEdgeInput(e.target.value)}
              className={`flex-grow p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-indigo-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            <button type="submit" className={`p-2 ${isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white rounded-md transition duration-300 flex items-center`}>
              <Plus size={18} className="mr-2" />
              Add Edge
            </button>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="source" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Source Node</label>
            <div className="relative">
              <MapPin size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                id="source"
                type="text"
                placeholder="Source node"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className={`pl-10 p-2 w-full border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-indigo-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
            </div>
          </div>
          <div>
            <label htmlFor="end" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>End Node</label>
            <div className="relative">
              <Target size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                id="end"
                type="text"
                placeholder="End node"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className={`pl-10 p-2 w-full border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-indigo-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
            </div>
          </div>
        </div>
        <div className="mb-6 hidden">
          <label htmlFor="algorithm" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Algorithm</label>
          <div className="relative">
            <GitBranch size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            <select
              id="algorithm"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className={`pl-10 p-2 w-full border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-indigo-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="dijkstra">Dijkstra</option>
              <option value="floydWarshall">Floyd-Warshall</option>
              <option value="bellmanFord">Bellman-Ford</option>
            </select>
          </div>
        </div>
        <button 
          onClick={findPath} 
          className={`w-full p-2 ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white rounded-md transition duration-300 flex items-center justify-center`}
        >
          <Play size={18} className="mr-2" />
          Find Distance
        </button>
      </div>

      {result && (
        <div className={`mt-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
          <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-indigo-800'}`}>Result:</h2>
          <p className="mb-2"><strong>Minimum Distance:</strong> {result.distance}</p>
          <p className="mb-4"><strong>Path:</strong> {result.path.join(' -> ')}</p>
          <div className="overflow-x-auto hidden">
            <LineChart
              width={500}
              height={300}
              data={result.path.map((node, index) => ({ name: node, distance: index }))}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#E5E7EB"} />
              <XAxis dataKey="name" stroke={isDarkMode ? "#D1D5DB" : "#4B5563"} />
              <YAxis stroke={isDarkMode ? "#D1D5DB" : "#4B5563"} />
              <Tooltip contentStyle={{ backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF", borderColor: isDarkMode ? "#374151" : "#E5E7EB" }} />
              <Legend />
              <Line type="monotone" dataKey="distance" stroke={isDarkMode ? "#818CF8" : "#4F46E5"} activeDot={{ r: 8 }} />
            </LineChart>
          </div>
        </div>
      )}

      <div id="graph" className={`h-96 ${isDarkMode ? 'bg-gray-800 border-gray-700'  : 'bg-white border-indigo-300'} border rounded-lg mt-8 shadow-lg`}></div>
    </div>
  );
};

export default Pathtracker;