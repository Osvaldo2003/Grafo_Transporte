import Graph from "../models/Graph.mjs";


const graph = new Graph();

document.getElementById('addStationBtn').addEventListener('click', () => {
    const stationNames = document.getElementById('stationName').value.trim().split(",");
    stationNames.forEach(stationName => {
        graph.addStation(stationName.trim());
    });
    showMessage('stationMessage', `Estaciones ${stationNames.join(', ')} agregadas.`, 'success');
});

document.getElementById('addRouteBtn').addEventListener('click', () => {
    const station1 = document.getElementById('station1').value.trim();
    const station2 = document.getElementById('station2').value.trim();
    const distance = parseInt(document.getElementById('distance').value, 10);
    graph.addRoute(station1, station2, distance);
    showMessage('routeMessage', `Ruta entre ${station1} y ${station2} agregada.`, 'success');
});

document.getElementById('dfsBtn').addEventListener('click', () => {
    const startStation = document.getElementById('startStationDFS').value.trim();
    const results = [];
    graph.dfs(startStation, station => {
        results.push(station);
    });
    document.getElementById('dfsResults').innerHTML = `<strong>Recorrido DFS desde ${startStation}:</strong> ${results.join(' -> ')}`;
    showMessage('dfsMessage', 'Recorrido DFS completado.', 'success');
});


document.getElementById('dijkstraBtn').addEventListener('click', () => {
    const startStation = document.getElementById('startStationDijkstra').value.trim();
    const { distances } = graph.dijkstra(startStation);
    const results = Object.entries(distances)
        .map(([station, distance]) => ({ station, distance }))
        .sort((a, b) => a.distance - b.distance) 
        .map(({ station, distance }) => `${station}: ${distance}`);

    document.getElementById('dijkstraResults').innerHTML = `<strong>Distancias desde ${startStation}:</strong><br>${results.join('<br>')}`;
    showMessage('dijkstraMessage', 'Algoritmo de Dijkstra completado.', 'success');
});

function showMessage(elementId, message, type) {
    const messageElement = document.getElementById(elementId);
    messageElement.innerText = message;
    messageElement.className = `message ${type}`;
    messageElement.style.display = 'block';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}
