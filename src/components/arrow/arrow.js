import React from 'react';

class Arrow extends React.Component {
    // Needs: coordinates of two points, data to display. Will go invisible if no data.
    render() {
        return (
            <div>
                <h1>{this.props.id}</h1>
            </div>
        );
    }
}

export default Arrow;
