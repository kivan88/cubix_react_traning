import React, { createContext, useContext, useState } from "react";

const DogContext = createContext();
DogContext.displayName = 'All dogs';

export const DogProvider = ({ children }) => {
  const [dogs, setDogs] = useState([
    {
        id: "1", 
        name: 'Pembroke welsh corgi', 
        image: 'https://dogx.hu/wp-content/uploads/2024/01/Pembroke-welsh-corgi-fajtaleiras-800x520.jpg'
      },
      {
        id: "2", 
        name: 'Dán dog', 
        image:'https://dogx.hu/wp-content/uploads/2022/08/Nemet-dog-a-legnagyobb-nagytestu-kutyafajta.jpg'
      }
  ]);

  const getDogById = (id) => {
    return dogs.find((asd) => asd.id === id);
  }

  const updateDog = (updatedDog) => {
    setDogs((prevDogs) =>
      prevDogs.map((dog) => (dog.id === updatedDog.id ? updatedDog : dog))
    );
  };

  const deleteDog = (id) => {
    setDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== id));
  };

  const addDog = (dog) => {
    setDogs([...dogs, dog]);
  };

  return (
    <DogContext.Provider value={{dogs, updateDog, deleteDog, getDogById, addDog }}>
      {children}
    </DogContext.Provider>
  );
};

export const useDogContext = () => useContext(DogContext);