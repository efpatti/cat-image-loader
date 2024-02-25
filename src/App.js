import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [imageCat, setImageCat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading) {
        searchCatImage();
      }
    }, 3000); // Troca de imagem a cada 3 segundos

    return () => clearInterval(interval);
  }, [isLoading]); // Chama useEffect somente quando isLoading muda

  const searchCatImage = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
      const catImageURL = response.data[0].url;
      setImageCat(catImageURL);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {imageCat && (
        <div
          className="h-screen w-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${imageCat})` }}
        />
      )}
      {error && <p className="text-red-500">Ocorreu um erro: {error}</p>}
    </div>
  );
};

export default App;
