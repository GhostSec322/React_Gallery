import React from 'react';

const ImageList = ({ images, onImageClick }) => (
  <div>
    {images.map((image) => (
      <div key={image.id} onClick={() => onImageClick(image)}>
        <img src={image.webformatURL} alt={image.tags} />
      </div>
    ))}
  </div>
);

export default ImageList;