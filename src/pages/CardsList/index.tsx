import React, { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ImageViewer from "../../components/ImageViewer";
import ItemCard from "../../components/ItemCard";
import { ItemType } from "../../interfaces/interfaces";
import update from "immutability-helper";
import "./index.css";

const CardsList: React.FC = () => {
  const [data, setData] = useState<ItemType[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const fetchData = () => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  };

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setData((prevCards: ItemType[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as ItemType],
        ],
      })
    );
  }, []);

  const selectImageHandler = (url: string) => {
    setSelectedImage(url);
  };

  const dismissImageHandler = () => {
    setSelectedImage("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="container">
          {data.map((item, index) => (
            <ItemCard
              key={item.position}
              index={index}
              id={item.position}
              title={item.title}
              moveCard={moveCard}
              type={item.type}
              onSelectImage={selectImageHandler}
            />
          ))}
        </div>
      </DndProvider>

      {selectedImage && (
        <ImageViewer
          imgUrl={selectedImage}
          onDismissImage={dismissImageHandler}
        />
      )}
    </>
  );
};

export default CardsList;
