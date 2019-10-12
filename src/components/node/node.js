import React from 'react';

class Node extends React.Component {
    // Needs: id, uuid, x and y coordinates, isLeader.
    render() {
        return (
            <div>
                <h1>{this.props.id}</h1>
            </div>
        );
    }
}

export default Node;
