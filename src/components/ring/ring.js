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
            "nodes": this.generateNodes(),
            "containerWidth": null
        }
    }

    generateNodes() {
        let createdNodes = [], coordinates = [];
        coordinates = distributeNodes(300, 800, 1000, 10, this.props.numNodes);

        for (let index = 0; index < this.props.numNodes; index++) {
            let uniqueIdentifier;

            // generate a unique identifier between 1 and 1000.
            while (true) {
                uniqueIdentifier = Math.floor(Math.random() * 1000 + 1);
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
                "xCordinate": coordinates[index][0],
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
        });
    }

    generateStyles() {
        let containerWidth = document.getElementById("container");
        console.log(containerWidth);
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
