import React from 'react';
import "./node.css";

class Node extends React.Component {
    render() {
        let classes = ["circle"];
        if (this.props.node.isLeader) {
            classes.push("leader");
        }

        return (
            <div>
                <div className={classes.join(" ")}>
                    {this.props.node.uid}
                </div>
                <div className="box">
                    
                </div>
            </div>
        );
    }
}

export default Node;
