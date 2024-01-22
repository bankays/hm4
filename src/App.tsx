// import { useState, useEffect } from "react";

// import "./App.css";
// type info = {
//   message: string[];
//   status: string;
// };
// function App(): JSX.Element {
//   const [apis, setApi] = useState<info[]>([]);
//   useEffect(() => {
//     const api = async () => {
//       const data: Response = await fetch("https://dog.ceo/api/breeds/list/all");
//       const json: any = await data.json();

//       setApi(json);
//     };
//     api();
//   }, []);
//   console.log(apis);

//   return (
//     <>
//       <h1>hello</h1>
//       <select name="" id="">
//         {" "}
//         choose one option
//         {apis.map((api) => (
//           <option>{api.message}</option>
//         ))}
//       </select>
//     </>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

interface DogGalleryProps {}

const DogGallery: React.FC<DogGalleryProps> = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [randomImage, setRandomImage] = useState<string>("");

  useEffect(() => {
    axios("https://dog.ceo/api/breeds/list/all")
      .then((res: AxiosResponse) => {
        const data = res.data;
        const breedsList: string[] = Object.keys(data.message);
        setBreeds(breedsList);
      })
      .catch((err: AxiosError) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (selectedBreed) {
      axios("https://dog.ceo/api/breed/${selectedBreed}/images")
        .then((res: AxiosResponse) => {
          const data = res.data;
          setImages(data.message);
        })
        .catch((err: AxiosError) => {
          console.error(err);
        });
    }
  }, [selectedBreed]);

  return (
    <div>
      <select onChange={(e) => setSelectedBreed(e.target.value)}>
        <option value="">Choose a dog breed</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      {selectedBreed && (
        <div>
          {images.map((image) => (
            <img
              key={image}
              src={image}
              alt="Dog"
              style={{ maxWidth: "150px", margin: "10px" }}
            />
          ))}
        </div>
      )}

      {randomImage && (
        <div>
          <img
            src={randomImage}
            alt="Random Dog"
            style={{ maxWidth: "150px", margin: "10px" }}
          />
        </div>
      )}

      <button
        onClick={() =>
          setRandomImage(images[Math.floor(Math.random() * images.length)])
        }
      >
        Random Dog
      </button>
    </div>
  );
};

export default DogGallery;
