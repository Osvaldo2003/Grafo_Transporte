export default class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }

    addStation(station) {
        if (!this.adjacencyList.has(station)) {
            console.log(`Añadiendo estación: ${station}`);
            this.adjacencyList.set(station, []);
        }
    }

    addRoute(station1, station2, distance = 1) {
        if (this.adjacencyList.has(station1) && this.adjacencyList.has(station2)) {
            console.log(`Añadiendo ruta entre ${station1} y ${station2} con distancia ${distance}`);
            this.adjacencyList.get(station1).push({ node: station2, distance });
            this.adjacencyList.get(station2).push({ node: station1, distance });
        } else {
            console.log(`No se puede añadir la ruta, una de las estaciones no existe.`);
        }
    }

    dfs(startStation, callback) {
        const visited = new Set();

        const dfsHelper = (station) => {
            visited.add(station);
            callback(station);
            const neighbors = this.adjacencyList.get(station) || [];
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor.node)) {
                    dfsHelper(neighbor.node);
                }
            }
        };

        dfsHelper(startStation);
    }

    dijkstra(startStation) {
        const distances = {};
        const pq = new PriorityQueue();
        const previous = {};
        const visited = new Set();

        distances[startStation] = 0;
        pq.enqueue(startStation, 0);

        this.adjacencyList.forEach((_, station) => {
            if (station !== startStation) {
                distances[station] = Infinity;
                previous[station] = null;
            }
        });

        while (!pq.isEmpty()) {
            const { value: currentStation } = pq.dequeue();

            if (!visited.has(currentStation)) {
                visited.add(currentStation);
                const neighbors = this.adjacencyList.get(currentStation) || [];

                for (let neighbor of neighbors) {
                    const { node, distance } = neighbor;
                    const alt = distances[currentStation] + distance;

                    if (alt < distances[node]) {
                        distances[node] = alt;
                        previous[node] = currentStation;
                        pq.enqueue(node, alt);
                    }
                }
            }
        }

        return { distances, previous };
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(value, priority) {
        this.values.push({ value, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.values.length === 0;
    }
}
