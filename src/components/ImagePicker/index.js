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
        let width = img.width;
        let height = img.height;
        let maxWidth = 100;
        let maxHeight = 100;
        if (img.width > maxWidth) {
          let ratio = maxWidth / width;
          width = 100;
          height = img.height * ratio;
        }
        if (height > maxHeight) {
          let ratio = maxHeight / height;
          height = 100;
          width = img.width * ratio;
        }

        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        image.matrix = ConvertImageToColorArray(canvas.getContext('2d').getImageData(0, 0, width, height).data);
        image.width = width;
        image.height = height;
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