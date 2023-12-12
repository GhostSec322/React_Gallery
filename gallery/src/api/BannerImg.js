import { useState,useEffect } from "react";
import module from '../api/Axios'

function BannerImg() {
    const [images, setImages] = useState([]);
    const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
  
    useEffect(() => {
      const imgNumber = getRandom(0, 10);
      const fetchRandomImages = async () => {
        const response = await module.get("", {
          params: {
            per_page: 20,
          },
        });
        setImages(response.data.hits[imgNumber].webformatURL);
      };
      fetchRandomImages();
    }, []);
    return <img style={{width:'100%',height:'440px',filter: 'brightness(50%)'}} src={images} alt="loading" />;
  }

  export default BannerImg;