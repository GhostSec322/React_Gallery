import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
const Pixabay = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const key = '39765109-40001bca1fc18e8827b3c5878';
  useEffect(() => {
    const fetchRandomImages = async () => {
      const API_KEY = key;
      const url = `https://pixabay.com/api/?key=${API_KEY}&per_page=10&image_type=photo&orientation=horizontal`;
      try {
        const response = await axios.get(url);
        setImages(response.data.hits);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRandomImages();
  }, []);

  const handleSearch = async (query) => {
    const API_KEY = key;
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo`;
    try {
      const response = await axios.get(url);
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
      <Login />
    </div>

  );
};

export default Pixabay;
