import React from 'react';
import "./node.css";

class Node extends React.Component {
    render() {
        let classes = ["circle"];
        if (this.props.node.isLeader) {
            classes.push("leader");
        }
        let nextMessage;
        if(this.props.node.data > 0) {
            nextMessage = <div className="box">{this.props.node.data}</div>;
        }

        return (
            <div>
                <div className={classes.join(" ")}>
                    {this.props.node.uid}
                </div>
                {nextMessage}
            </div>
        );
    }
}

export default Node;
