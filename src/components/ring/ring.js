import React from 'react';
import "./ring.css";
import Node from "../node/node.js";
import distributeNodes from './utils';
import lcr from "../../algorithms/lcr";
import { Navbar, Button, ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";

class Ring extends React.Component {
    static defaultState = {
        "nodes": [],
        "inProgress": false,
        "numNodes": 3,
        "algorithm": "LCR",
        "speed": "regular"
    }

    constructor(props) {
        super(props);
        this.state = Ring.defaultState;

        // bind functions.
        this.runAlgorithm = this.runAlgorithm.bind(this);
        this.addNode = this.addNode.bind(this);
        this.removeNode = this.removeNode.bind(this);
        this.chooseAlgorithm = this.chooseAlgorithm.bind(this);
        this.selectSpeed = this.selectSpeed.bind(this);
    }

    /**
     * Generate the nodes to place on the canvas.
     * @param containerWidth the width of the container. 
     */
    generateNodes(containerWidth, numNodes) {
        let createdNodes = [], coordinates = [];
        const xOffset = Math.max(0, (containerWidth - 800)/ 2 - 50);
        coordinates = distributeNodes(325, 800, 800, 10, numNodes);

        for (let index = 0; index < numNodes; index++) {
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

            let nxt = index + 1;
            if(nxt === numNodes) nxt = 0;
            let currentNode = {
                "id": index + 1,
                "uid": uniqueIdentifier,
                "isLeader": false,
                "xCoordinate": coordinates[index][0] + xOffset,
                "yCoordinate": coordinates[index][1],
                "nextX": coordinates[nxt][0] + xOffset,
                "nextY": coordinates[nxt][1]
            }
            createdNodes.push(currentNode);
        }

        return createdNodes;
    }

    // source: https://stackoverflow.com/a/49059117/6748052
    componentDidMount() {
        this.setState((previous) => ({
            containerWidth: this.container.offsetWidth,
            containerHeight: this.container.offsetHeight,
            nodes: this.generateNodes(this.container.offsetWidth, previous.numNodes)
        }));
    }

    /**
     * Runs the currently set algorithms with the current nodes and other settings.
     */
    runAlgorithm() {
        this.setState({
            inProgress: true
        });
        if(this.state.algorithm === "LCR") {
            let result = lcr(this.state.nodes);
            console.log(result);
        }
        this.setState({ inProgress: false });
    }

    addNode() {
        this.setState((previous) => ({
            numNodes: previous.numNodes + 1,
            nodes: this.generateNodes(this.container.offsetWidth, previous.numNodes + 1)
        }));
    }

    removeNode() {
        this.setState((previous) => ({
            numNodes: previous.numNodes - 1,
            nodes: this.generateNodes(this.container.offsetWidth, previous.numNodes - 1)
        }));
    }

    chooseAlgorithm(selectedAlgorithm) {
        this.setState({
            algorithm: selectedAlgorithm
        });
    }

    selectSpeed(selectedSpeed) {
        this.setState({
            speed: selectedSpeed
        });
    }

    renderContent() {
        return (
            <div>
                {this.state.nodes.map(node =>
                    <div key={node.id} style={{ top: node.yCoordinate + "px", left: node.xCoordinate + "px", position: "absolute" }}>
                        <Node node={node} />
                    </div>)
                }
            </div>
        );
    }

    render() {
        const { containerWidth } = this.state;
        let disabledState = (this.state.inProgress) ? "disabled" : null;

        return (
            <div>
                <div>
                    <Navbar bg="dark" variant="dark" expand="xl">
                        <Navbar.Brand href="">
                            <img
                                alt=""
                                src={require('./logo.svg')}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />
                            {' Algo Visualizer'}
                        </Navbar.Brand>
                        &emsp; &emsp; &emsp; &emsp;
                        <ButtonToolbar>
                            <Button variant="primary" disabled={disabledState} onClick={this.addNode}>Add node</Button>
                            &emsp;
                            <Button variant="primary" disabled={disabledState} onClick={this.removeNode}>Remove node</Button>
                            &emsp;
                            <DropdownButton id="dropdown-basic-button" title="Algorithm" onSelect={this.chooseAlgorithm} disabled={disabledState}>
                                <Dropdown.Item eventKey="LCR">LCR Algorithm</Dropdown.Item>
                            </DropdownButton>
                            &emsp;
                            <Button variant="primary" type="submit" onClick={this.runAlgorithm} disabled={disabledState}>Visualize</Button>
                            &emsp;
                            <DropdownButton id="dropdown-basic-button" title="Speed" onSelect={this.selectSpeed} disabled={disabledState}>
                                <Dropdown.Item eventKey="slow">Slow</Dropdown.Item>
                                <Dropdown.Item eventKey="regular">Regular</Dropdown.Item>
                                <Dropdown.Item eventKey="fast">Fast</Dropdown.Item>
                            </DropdownButton>
                        </ButtonToolbar>
                    </Navbar>
                </div>

                <div id="container" ref={el => (this.container = el)}>
                    {containerWidth && this.renderContent()}
                </div>
            </div>
        );
    }
}

export default Ring;
