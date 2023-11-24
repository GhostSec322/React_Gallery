import React, { useState, useEffect } from 'react';
import Login from './Login';
import module from '../api/Axios'
const Pixabay = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
 
  useEffect(() => {
    const fetchRandomImages = async () => {
      try {
        const response = await module.get();
        setImages(response.data.hits);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRandomImages();
  }, []);

  const handleSearch = async (query) => {
    try {
      const response = await module.get();
      setImages(response.data.hits);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleDownload = () => {
    if (selectedImage) {
      const link = document.createElement('a');
      link.href = selectedImage.largeImageURL;
      link.download = 'image.jpg';
      link.click();
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={() => handleSearch(query)}>Search</button>
      </div>
      <div>
        {images.map((image) => (
          <div key={image.id} onClick={() => handleImageClick(image)}>
            <img src={image.webformatURL} alt={image.tags} />
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="modal">
          <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
        <Login/>
    </div>

);
};

export default Pixabay;
