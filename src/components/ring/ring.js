import React from 'react';
import "./ring.css"
import DistributeNodes from './utils';

class Ring extends React.Component {
    static defaultProps = {
        numNodes: 3,
        algorithm: "LCR",
        speed: "Normal"    
    }

    generateNodes() {
        let createdNodes = [], coordinates = [];
        coordinates = DistributeNodes(200, 800, 800, this.props.numNodes);


        for (let index = 0; index < this.props.numNodes; index++) {
            let uniqueIdentifier;

            // generate a unique identifier between 1 and 1000.
            while (true) {
                uniqueIdentifier = (Math.random() * 1000 + 1);
                let tobreak = true;

                for (let i = 0; i < createdNodes.length; i++) {
                    const element = createdNodes[i];
                    if(element.uid === uniqueIdentifier) {
                        tobreak = false;
                        break;
                    }
                }

                if (tobreak) {
                    break;
                }
            }

            let currentNode = {
                "id": index + 1,
                "uid": uniqueIdentifier,
                "isLeader": false,
                "xCordinate": coordinates[index].x,
                "yCoordinate": coordinates[index].y
            }
            createdNodes.push(currentNode);
        }

        return createdNodes;
    }

    render() {
        return (
            <div id="container">
                <div id="center" style={{ textAlign: "center" }}></div>
            </div>
        );
    }
}

export default Ring;
