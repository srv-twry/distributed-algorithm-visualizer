import React from 'react';
import "./ring.css"
import Node from "../node/node.js";
import distributeNodes from './utils';

class Ring extends React.Component {
    static defaultProps = {
        numNodes: 15,
        algorithm: "LCR",
        speed: "Normal"    
    }

    constructor(props) {
        super(props);
        this.state = {
            "nodes": [],
            "containerWidth": null,
            "containerHeight": null
        }
    }

    generateNodes(containerWidth) {
        let createdNodes = [], coordinates = [];
        const xOffset = Math.max(0, (containerWidth - 800)/ 2 - 50);
        coordinates = distributeNodes(325, 800, 800, 10, this.props.numNodes);

        for (let index = 0; index < this.props.numNodes; index++) {
            let uniqueIdentifier;

            // generate a unique identifier between 1 and 99.
            while (true) {
                uniqueIdentifier = Math.floor(Math.random() * 99 + 1);
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
                "xCordinate": coordinates[index][0] + xOffset,
                "yCoordinate": coordinates[index][1]
            }
            createdNodes.push(currentNode);
        }

        return createdNodes;
    }

    // source: https://stackoverflow.com/a/49059117/6748052
    componentDidMount() {
        this.setState({
            containerWidth: this.container.offsetWidth,
            containerHeight: this.container.offsetHeight,
            nodes: this.generateNodes(this.container.offsetWidth)
        });
    }

    renderContent() {
        return (
            <div>
                {this.state.nodes.map(node =>
                    <div key={node.id} style={{ top: node.yCoordinate + "px", left: node.xCordinate + "px", position: "absolute" }}>
                        <Node node={node} />
                    </div>)}
            </div>
        );
    }

    render() {
        const { containerWidth } = this.state;

        return (
            <div id="container" ref={el => (this.container = el)}>
                {containerWidth && this.renderContent()}
            </div>
        );
    }
}

export default Ring;
