import React from 'react';
import "./ring.css";
import Node from "../node/node.js";
import distributeNodes from './utils';
import lcr from "../../algorithms/lcr";
import { Navbar, Button, ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";


class Ring extends React.Component {
    static defaultProps = {
        numNodes: 15,
        algorithm: "LCR",
        speed: "Normal"    
    }

    static defaultState = {
        "nodes": [],
        "containerWidth": null,
        "containerHeight": null,
        "inProgress": false
    }

    constructor(props) {
        super(props);
        this.state = Ring.defaultState;
        this.runAlgorithm = this.runAlgorithm.bind(this);
        this.handleButtons = this.handleButtons.bind(this);
    }

    /**
     * Generate the nodes to place on the canvas.
     * @param containerWidth the width of the container. 
     */
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

        //TODO: Delete this.
        lcr(createdNodes);
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

    /**
     * Runs the currently set algorithms with the current nodes and other settings.
     */
    runAlgorithm() {
        this.setState({
            inProgress: true
        })
        if(this.state.algorithm === "LCR") {
            lcr(this.state.nodes);
        }
        this.setState({ inProgress: false });
    }

    /**
     * Handles the nav bar buttons.
     */
    handleButtons() {

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
                            <Button variant="primary" href="#">Add node</Button>
                            &emsp;
                            <Button variant="primary" href="#">Remove node</Button>
                            &emsp;
                            <DropdownButton id="dropdown-basic-button" title="Algorithm">
                                <Dropdown.Item href="#/action-1">LCR Algorithm</Dropdown.Item>
                            </DropdownButton>
                            &emsp;
                            <Button variant="primary" type="submit">Visualize</Button>
                            &emsp;
                            <Button variant="primary" type="submit">Clear</Button>
                            &emsp;
                            <DropdownButton id="dropdown-basic-button" title="Speed">
                                <Dropdown.Item href="#/action-1">Slow</Dropdown.Item>
                                <Dropdown.Item href="#/action-1">Regular</Dropdown.Item>
                                <Dropdown.Item href="#/action-1">Fast</Dropdown.Item>
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
