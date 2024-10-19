import React, { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ImageViewer from "../../components/ImageViewer";
import ItemCard from "../../components/ItemCard";
import { ItemType } from "../../interfaces/interfaces";
import update from "immutability-helper";
import "./index.css";
import Loader from "../../components/Loader";
import moment from "moment";

const CardsList: React.FC = () => {
  const [data, setData] = useState<ItemType[]>([]);
  const [initialRender, setInitialRender] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchData = async () => {
    setIsFetching(true);
    const response = await fetch("/cardsData", {
      mode: "no-cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response.json().then((data) => setData(data));
    setIsFetching(false);
  };

  const updateCardsData = useCallback(async () => {
    setIsLoading(true);
    await fetch("/updateCards", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let currentTime: Date = new Date();
    setLastUpdated(currentTime);
    localStorage.setItem("lastSavedTime", currentTime.toString());
    setIsLoading(false);
  }, [data]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setData((prevCards: ItemType[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as ItemType],
        ],
      })
    );
    setInitialRender(false);
  }, []);

  const selectImageHandler = (url: string) => {
    setSelectedImage(url);
  };

  const dismissImageHandler = () => {
    setSelectedImage("");
  };

  const getTimeSinceLastSaved = () => {
    return moment.utc(lastUpdated).local().startOf("seconds").fromNow();
  };

  useEffect(() => {
    let lastUpdatedTime = localStorage.getItem("lastSavedTime");
    if (lastUpdatedTime) {
      let time = new Date(lastUpdatedTime);
      setLastUpdated(time);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!initialRender) {
      let timer = setTimeout(() => {
        updateCardsData();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [data, updateCardsData, initialRender]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="page-container">
          <div className="last-saved-container">
            <p className="last-saved-text">
              Last saved: {getTimeSinceLastSaved()}{" "}
            </p>
            {isLoading && <Loader />}
          </div>
          {isFetching ? (
            <div className="cards-loader-container">
              <Loader />
            </div>
          ) : (
            <div className="cards-container">
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
          )}
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
