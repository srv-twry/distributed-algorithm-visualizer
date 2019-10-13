import React from 'react';
import "./node.css";

class Node extends React.Component {
    // Needs: id, uuid, x and y coordinates, isLeader.
    render() {
        let classes = ["circle"];
        if (this.props.node.isLeader) {
            classes.push("leader");
        }

        return (
            <div className={classes.join(" ")}>
                {this.props.node.uid}
            </div>
        );
    }
}

export default Node;
