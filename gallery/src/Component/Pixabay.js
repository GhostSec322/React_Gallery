import React, { useState, useEffect } from 'react';
import { fetchRandomImages, searchImages } from '../api/Axios';
import ImageList from './ImageList';
import Login from './Login';

const Pixabay = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const result = await fetchRandomImages();
        setImages(result);
      } catch (error) {
        // Handle errors
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      const result = await searchImages(query);
      setImages(result);
    } catch (error) {
      // Handle errors
    } finally {
      setLoading(false);
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
      {loading && <p>Loading...</p>}
      <div>
        <ImageList images={images} onImageClick={handleImageClick} />
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