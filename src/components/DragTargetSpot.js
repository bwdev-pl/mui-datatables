import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const defaultBodyStyles = {
    root: {},
    draggableRow: {},
    emptyTitle: {
        textAlign: 'center',
    },
    dragTargetSpot: {
        backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2r9//38gYGAEESAAEGAAasgJOgzOKCoAAAAASUVORK5CYII=)',
        height: '15px',
        textAlign: 'center',
        color: '#666',
        fontWeight: 'bold',
        userSelect: 'none',
    },
    highlight: {
        background: '#d3d3d3',
    },
};

class DragTargetSpot extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        classes: PropTypes.object,
        columnsCount: PropTypes.number.isRequired
    };

    state = {
        highlightDragOver: false
    };

    render() {
        const {data, classes, callback, tableRows} = this.props;
        const classesToAdd = [classes.dragTargetSpot];
        if (this.state.highlightDragOver) {
            classesToAdd.push(classes.highlight);
        }

        return (
            <tr
                onDrop={(event) => {
                    if (callback) {
                        const rowIndex = event.dataTransfer.getData('rowIndex');
                        const dataIndex = event.dataTransfer.getData('dataIndex');
                        const row = tableRows.findIndex(row => row.dataIndex === dataIndex);
                        const prevRowIndex = tableRows.findIndex(row => row.dataIndex === data.dragTargetSpotIndex - 1);
                        let prevRow = null;
                        if (prevRowIndex >= 0) {
                            prevRow = tableRows[prevRowIndex];
                        }
                        const nextRowIndex = tableRows.findIndex(row => row.dataIndex === data.dragTargetSpotIndex);
                        let nextRow = null;
                        if (nextRowIndex >= 0) {
                            nextRow = tableRows[nextRowIndex];
                        }
                        callback(row, prevRow, nextRow, rowIndex, data.dragTargetSpotIndex);
                    }
                    this.setState({highlightDragOver: false});
                }}
                onDragOver={(event) => {
                    event.preventDefault();
                }}
                onDragEnter={() => {
                    this.setState({highlightDragOver: true});
                }}
                onDragLeave={() => {
                    this.setState({highlightDragOver: false});
                }}
            >
                <td className={classesToAdd.join(' ')} colSpan={this.props.columnsCount}/>
            </tr>
        );
    }
}

export default withStyles(defaultBodyStyles, {name: 'MUIDataTableDragTargetSpot'})(DragTargetSpot);