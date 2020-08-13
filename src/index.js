import React from 'react';
import ReactDOM from 'react-dom';
import tinycolor from 'tinycolor2';
import BubbleSort from './sorting/bubbleSort';
import InsertionSort from './sorting/insertionSort';
import SelectionSort from './sorting/selectionSort';
import './index.css';

class ColorSorter extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      colors: [],
      matrixWidth: 360,
      gridSize: 25,
      sortAlgorithm: 'bubblesort'
    }

    this.handleGridSizeChange = this.handleGridSizeChange.bind(this);
    this.handleSortAlgorithmChange = this.handleSortAlgorithmChange.bind(this);
    this.handleSortColorsClick = this.handleSortColorsClick.bind(this);
    this.getColorList = this.getColorList.bind(this);
    this.generateColorMatrix = this.generateColorMatrix.bind(this);
    this.renderSortedMatrix = this.renderSortedMatrix.bind(this);

    this.Init();
  }

  Init() {
    window.addEventListener('load', () => {
      this.generateColorMatrix(parseInt(this.state.gridSize));
    });
  }

  handleSortAlgorithmChange(e) {
    this.setState({sortAlgorithm: e.target.value});
    this.clearSortedMatrix();
  }

  handleGridSizeChange(e) {
    this.setState({gridSize: parseInt(e.target.value)});
    this.clearColors();
  }

  handleSortColorsClick(e) {
    let colorList = document.getElementById('colorsSorted');
    colorList.innerHTML = 'Sorting...';

    let t0, t1;
    let selectedAlgorithm = document.getElementById('selectedAlgorithm');
    switch(this.state.sortAlgorithm){
      case 'insertionsort':
        selectedAlgorithm.innerHTML = 'Insertion sort';
        t0 = performance.now();
        InsertionSort(this.state.colors);
        t1 = performance.now();
        break;
      case 'selectionsort':
        selectedAlgorithm.innerHTML = 'Selection sort';
        t0 = performance.now();
        SelectionSort(this.state.colors);
        t1 = performance.now();
        break;
      case 'bubblesort':
      default:
        selectedAlgorithm.innerHTML = 'Bubble sort';
        t0 = performance.now();
        BubbleSort(this.state.colors);
        t1 = performance.now();
        break;
    }

    let elapsedTime = Math.round(t1 - t0);
    let unit = ' milliseconds';
    if (elapsedTime > 1000){
      elapsedTime = Math.round(elapsedTime / 10) / 100;
      unit = ' seconds';
    }
    document.getElementById('elapsedTime').innerHTML =  elapsedTime + unit;
    this.renderSortedMatrix();
  }

  clearColors() {
    this.setState({ colors: [] });
    this.clearMatrix();
  }

  clearMatrix() {
    document.getElementById('colors').innerHTML = '';
    this.clearSortedMatrix();
  }

  clearSortedMatrix() {
    document.getElementById('colorsSorted').innerHTML = '';
    document.getElementById('selectedAlgorithm').innerHTML = '';
    document.getElementById('elapsedTime').innerHTML = '';
  }

  getColorList(count){
    let colors = [];
    for (let i = 0; i < count; i++){
      colors.push(tinycolor.random());
    }
    return colors;
  }

  generateColorMatrix() {
    let colorList = document.getElementById('colors');
    colorList.innerHTML = "";
    let gridTemplateColumns = "";

    for (let i = 0; i < this.state.gridSize; i++) {
      gridTemplateColumns += '1fr ';
    }

    let matrix = document.createElement('ul');
    matrix.className = "matrix";
    matrix.setAttribute('style', 'grid-template-columns: ' + gridTemplateColumns + ';width:' + this.state.matrixWidth + 'px;');

    let colors = this.getColorList(this.state.gridSize*this.state.gridSize)
    this.setState({colors: colors});
    let pixelSize = this.state.matrixWidth/this.state.gridSize;
    for (let color of colors){
      let listItem = document.createElement('li');
      listItem.setAttribute('style', 'background-color:' + color.toHslString() + '; width: ' + pixelSize + 'px; height: ' + pixelSize + 'px;');
      matrix.append(listItem);
    }

    colorList.append(matrix);
  }

  renderSortedMatrix(){
    let colorList = document.getElementById('colorsSorted');
    colorList.innerHTML = "";
    let gridTemplateColumns = "";

    for (let i = 0; i < this.state.gridSize; i++) {
      gridTemplateColumns += '1fr ';
    }

    let matrix = document.createElement('ul');
    matrix.className = "matrix";
    matrix.setAttribute('style', 'grid-template-columns: ' + gridTemplateColumns + ';width:' + this.state.matrixWidth + 'px;');

    let pixelSize = this.state.matrixWidth/this.state.gridSize;
    for (let color of this.state.colors){
      let listItem = document.createElement('li');
      listItem.setAttribute('style', 'background-color:' + color.toHslString() + '; width: ' + pixelSize + 'px; height: ' + pixelSize + 'px;');
      matrix.append(listItem);
    }

    console.log('RenderSortedMatrix: ', colorList, matrix);
    colorList.append(matrix);
  }

  render() {
    return (
      <section className="colorSorter">
        <h2>Array of colors:</h2>
        <div>
          <label>
            Grid size:
            <input type="number" min="10" max="360" step="1" id="gridSize" value={this.state.gridSize} onChange={this.handleGridSizeChange} />
          </label>
          <button id="regeneratecolors" onClick={this.generateColorMatrix}>Generate colors</button>
        </div>
        <div>
          <label>
            Sorting algorithm:
            <select id="algorithm" value={this.state.sortAlgorithm} onChange={this.handleSortAlgorithmChange}>
              <option value="bubblesort">Bubble sort</option>
              <option value="insertionsort">Insertion sort</option>
              <option value="selectionsort">Selection sort</option>
            </select>
          </label>
          <button id="sortColors" onClick={this.handleSortColorsClick} disabled={this.state.colors.length<1}>Sort</button>
        </div>
        <section id="colors">test</section>
        <h2>Sorted</h2>
        <p>
          Sorting algorithm: <span id="selectedAlgorithm" className="bold"></span><br />
          Sorted in: <span id="elapsedTime" className="bold"></span>
        </p>
        <section id="colorsSorted">test sorted</section>
      </section>
    );
  }
}

// ========================================

ReactDOM.render(
  <ColorSorter />,
  document.getElementById('root')
);