import React from 'react';
import ConvertImageToColorArray from '../../services/imageProcessor';

class ImagePicker extends React.Component {

  handleImage(e){
    var reader = new FileReader();
    reader.onload = (e) => {
      let canvas = document.createElement('canvas');
      let image = {
        matrix: [],
        width: 0,
        height: 0
      };

      var img = new Image();
      img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          let ctx = canvas.getContext('2d');
          ctx.drawImage(img,0,0);
          image.matrix = ConvertImageToColorArray(canvas.getContext('2d').getImageData(0, 0, img.width, img.height).data);
          image.width = img.width;
          image.height = img.height;
          this.props.onImageLoaded(image);
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