import React from 'react';
import generateListOfRandomColors from '../../services/color';
import BubbleSort from '../../services/algorithms/bubblesort';
import InsertionSort from '../../services/algorithms/insertionsort';
import SelectionSort from '../../services/algorithms/selectionsort';

import Matrix from '../Matrix';

class ColorSorter extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      colors: [],
      sortedColors: [],
      matrixWidth: 360,
      gridSize: 25,
      sortAlgorithm: 'bubblesort'
    }
    this.state.colors = generateListOfRandomColors(this.state.gridSize*this.state.gridSize);

    this.handleGridSizeChange = this.handleGridSizeChange.bind(this);
    this.handleSortAlgorithmChange = this.handleSortAlgorithmChange.bind(this);
    this.handleSortColorsClick = this.handleSortColorsClick.bind(this);
    this.handleGenerateColorsClick = this.handleGenerateColorsClick.bind(this);
  }

  handleSortAlgorithmChange(e) {
    this.setState({sortAlgorithm: e.target.value});
    this.clearSorted();
  }

  handleGridSizeChange(e) {
    this.setState({gridSize: parseInt(e.target.value)});
    this.clearColors();
  }

  handleSortColorsClick(e) {
    this.clearSorted();
    let t0, t1;
    let selectedAlgorithm = document.getElementById('selectedAlgorithm');
    switch(this.state.sortAlgorithm){
      case 'insertionsort':
        selectedAlgorithm.innerHTML = 'Insertion sort';
        t0 = performance.now();
        this.setState({sortedColors: InsertionSort(this.state.colors) });
        t1 = performance.now();
        break;
      case 'selectionsort':
        selectedAlgorithm.innerHTML = 'Selection sort';
        t0 = performance.now();
        this.setState({sortedColors: SelectionSort(this.state.colors) });
        t1 = performance.now();
        break;
      case 'bubblesort':
      default:
        selectedAlgorithm.innerHTML = 'Bubble sort';
        t0 = performance.now();
        this.setState({sortedColors: BubbleSort(this.state.colors) });
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
  }

  handleGenerateColorsClick(e){
    this.setState({
      colors: generateListOfRandomColors(this.state.gridSize * this.state.gridSize),
      sortedColors: []
    });
  }

  clearColors() {
    this.setState({ colors: [] });
    this.clearSorted();
  }

  clearSorted() {
    this.setState({ sortedColors: [] });
    document.getElementById('selectedAlgorithm').innerHTML = '';
    document.getElementById('elapsedTime').innerHTML = '';
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
          <button id="regeneratecolors" onClick={this.handleGenerateColorsClick}>Generate colors</button>
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
        <Matrix gridSize={this.state.gridSize} colors={this.state.colors} />
        <h2>Sorted</h2>
        <p>
          Sorting algorithm: <span id="selectedAlgorithm" className="bold"></span><br />
          Sorted in: <span id="elapsedTime" className="bold"></span>
        </p>
        <Matrix gridSize={this.state.gridSize} colors={this.state.sortedColors} />
      </section>
    );
  }
}

export default ColorSorter;
