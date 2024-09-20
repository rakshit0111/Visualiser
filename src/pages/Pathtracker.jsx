import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Network, DataSet } from 'vis-network/standalone';

const Pathtracker = () => {
  const [algorithm, setAlgorithm] = useState('dijkstra');
  const [graph, setGraph] = useState({});
  const [source, setSource] = useState('');
  const [end, setEnd] = useState('');
  const [result, setResult] = useState(null);
  const [edgeInput, setEdgeInput] = useState('');

  const addEdge = (from, to, weight) => {
    setGraph(prevGraph => ({
      ...prevGraph,
      [from]: { ...(prevGraph[from] || {}), [to]: parseInt(weight) },
      [to]: { ...(prevGraph[to] || {}), [from]: parseInt(weight) }
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

    Object.keys(graph).forEach(node => {
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

    Object.keys(graph).forEach(node => {
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
      const options = { physics: false };
      new Network(container, data, options);
    }
  };

  useEffect(() => {
    drawGraph();
  }, [graph]);

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Pathtracker</h1>
      <div style={{ marginBottom: '1rem' }}>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
          <option value="dijkstra">Dijkstra</option>
          <option value="floydWarshall">Floyd-Warshall</option>
          <option value="bellmanFord">Bellman-Ford</option>
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <form onSubmit={handleAddEdge}>
          <input
            type="text"
            placeholder="Add edge (format: from,to,weight)"
            value={edgeInput}
            onChange={(e) => setEdgeInput(e.target.value)}
          />
          <button type="submit">Add Edge</button>
        </form>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Source node"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="End node"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>
      <button onClick={findPath}>Find Path</button>
      {result && (
        <div style={{ marginTop: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'semibold' }}>Result:</h2>
          <p>Distance: {result.distance}</p>
          <p>Path: {result.path.join(' -> ')}</p>
          <LineChart
            width={500}
            height={300}
            data={result.path.map((node, index) => ({ name: node, distance: index }))}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="distance" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      )}
      <div id="graph" style={{ height: '400px', border: '1px solid lightgray', marginTop: '1rem' }} />
    </div>
  );
};

export default Pathtracker;
