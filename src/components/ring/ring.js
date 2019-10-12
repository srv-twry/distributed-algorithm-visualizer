import React from 'react';

class Ring extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.id}</h1>
            </div>
        );
    }
}

export default Ring;
