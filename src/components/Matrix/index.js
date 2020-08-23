import React from 'react';

class Matrix extends React.Component {

  render() {
    let styling = {
      'gridTemplateColumns': '',
      'width': this.props.pixelSize * this.props.gridSize + 'px'
    };

    for (let i = 0; i < this.props.gridSize; i++) {
      styling.gridTemplateColumns += '1fr ';
    }

    let pixelSize = this.props.pixelSize;
    let listItems = this.props.colors.map((value, index) => {
      let style = {
        'backgroundColor': value.toHslString(),
        'width': pixelSize + 'px',
        'height': pixelSize + 'px'
      };
      return <li key={index} style={style}></li>
    });

    return (
      <ul className="matrix" style={styling}>
        {listItems}
      </ul>
    );
  }
};

export default Matrix;
