
/**
 * @param radius : radius of the ring.
 * @param width : width of the container
 * @param height : height of the container
 * @param nodeWidth : width of a single node
 * @param numNodes : number of nodes to put on the ring
 * Finds the x and y coordinates of the nodes to put on the ring.
 */
function distributeNodes(radius, width, height, nodeWidth, numNodes) {
    let angle = 0, step = (2 * Math.PI) / numNodes, coordinates = [];
    for (let index = 0; index < numNodes; index++) {
        let x = Math.round(width / 2 + radius * Math.cos(angle) - nodeWidth / 2);
        let y = Math.round(height / 2 + radius * Math.sin(angle) - nodeWidth / 2);
        coordinates.push([x, y]);
        angle += step;
    }
    return coordinates;
}

export default distributeNodes;