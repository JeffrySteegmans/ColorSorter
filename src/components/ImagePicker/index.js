import React from 'react';
import { ConvertImageToColorArray, GetResizedImageDimensions, GetCanvasData } from '../../services/imageProcessor';

class ImagePicker extends React.Component {

  handleImage(e){
    var reader = new FileReader();
    reader.onload = (e) => {
      let imageData = {
        matrix: [],
        width: 0,
        height: 0
      };

      var img = new Image();
      img.onload = () => {
        imageData = {...imageData, ...GetResizedImageDimensions(img, 100, 100) };

        let canvasData = GetCanvasData(img, imageData.width, imageData.height);
        imageData.matrix = ConvertImageToColorArray(canvasData);

        this.props.onImageLoaded(imageData);
      }
      img.src = e.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  render() {
    return (
      <input type='file' onChange={(e) => this.handleImage(e)} />
    );
  }
}

export default ImagePicker;