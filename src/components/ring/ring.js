import React from 'react';
import "./ring.css";
import Node from "../node/node.js";
import distributeNodes from './utils';
import lcr from "../../algorithms/lcr";
import { Navbar, Button, ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";
import {getLCRMetaData} from "../../algorithms/lcr";

const MINIMUM_NODES = 3;

class Ring extends React.Component {
    static defaultState = {
        "nodes": [],
        "inProgress": false,
        "numNodes": 5,
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

            let currentNode = {
                "id": index + 1,
                "uid": uniqueIdentifier,
                "isLeader": false,
                "xCoordinate": coordinates[index][0] + xOffset,
                "yCoordinate": coordinates[index][1],
                "data": null
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
        let animationTime = 1000;
        if(this.state.speed === "slow") {
            animationTime = 2000;
        } else if(this.state.speed === "fast") {
            animationTime = 500;
        }

        if(this.state.algorithm === "LCR") {
            let {path, leader} = lcr(this.state.nodes);
            for(let idx = 0; idx < path.length; idx++) {
                setTimeout(() => {
                    const res = path[idx];
                    let newNodes = this.state.nodes;
                    for (let nidx = 0; nidx < newNodes.length; nidx++) {
                        newNodes[nidx].data = res[nidx];
                        if (idx === path.length - 1 && nidx === leader) {
                            newNodes[nidx].isLeader = true;
                        }
                    }
                    this.setState({
                        node: newNodes
                    });
                }, animationTime * idx);
            }
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
        if (this.state.numNodes <= MINIMUM_NODES) {
            return;
        }

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

    getMetaDataOfAlgorithm() {
        if(this.state.algorithm === "LCR") {
            return getLCRMetaData();
        }
    }

    renderDescription(description) {
        return (
            description.split("\n").map((i, key) => {
                return <div key={key}>{i}</div>;
            })
        );
    }

    render() {
        const { containerWidth } = this.state;
        let disabledState = (this.state.inProgress) ? "disabled" : null;
        let removeNodeBtnDisableState = disabledState || this.state.numNodes <= MINIMUM_NODES;
        let meta = this.getMetaDataOfAlgorithm();

        return (
            <div>
                <div>
                    <Navbar bg="dark" variant="dark" expand="xl" className="justify-content-between">
                        <Navbar.Brand href="">
                            <img
                                alt=""
                                src={require('./logo.svg')}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />
                            {' Algorithm Visualizer'}
                        </Navbar.Brand>
                        &emsp; &emsp; &emsp; &emsp;
                        <ButtonToolbar>
                            <Button variant="secondary" disabled={disabledState} onClick={this.addNode}>Add node</Button>
                            &emsp;
                            <Button variant="secondary" disabled={removeNodeBtnDisableState} onClick={this.removeNode}>Remove node</Button>
                            &emsp;
                            <DropdownButton id="dropdown-basic-button" title="Speed" onSelect={this.selectSpeed} disabled={disabledState}>
                                <Dropdown.Item eventKey="slow">Slow</Dropdown.Item>
                                <Dropdown.Item eventKey="regular">Regular</Dropdown.Item>
                                <Dropdown.Item eventKey="fast">Fast</Dropdown.Item>
                            </DropdownButton>
                            &emsp;
                            <DropdownButton id="dropdown-variants-secondary" title="Algorithm" onSelect={this.chooseAlgorithm} disabled={disabledState}>
                                <Dropdown.Item eventKey="LCR">LCR Algorithm</Dropdown.Item>
                            </DropdownButton>
                            &emsp;
                            <Button variant="success" type="submit" onClick={this.runAlgorithm} disabled={disabledState}>Visualize</Button>
                        </ButtonToolbar>
                    </Navbar>
                </div>

                <div id="container" ref={el => (this.container = el)}>
                    {containerWidth && this.renderContent()}
                </div>

                <div id="description" >
                    {containerWidth && <h3>{meta.title}</h3>}
                    {containerWidth && this.renderDescription(meta.description)}
                </div>
            </div>
        );
    }
}

export default Ring;
