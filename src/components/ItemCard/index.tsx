import type { Identifier } from "dnd-core";
import type { FC } from "react";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ImageUrls } from "../../constants/imageLinks";
import "./index.css";
import { CardProps, DragItem } from "../../interfaces/interfaces";
import Loader from "../Loader";

const ItemCard: FC<CardProps> = ({
  id,
  title,
  index,
  moveCard,
  type,
  onSelectImage,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "ItemCard",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "ItemCard",
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity: number = isDragging ? 0 : 1;
  drag(drop(ref));

  const handleImageLoaded = () => {
    setLoading(false);
  };

  return (
    <div
      ref={ref}
      className={
        opacity ? "card-container opacity" : "card-container opacity-none"
      }
      data-handler-id={handlerId}
    >
      <p className="title">{title}</p>
      <div className="img-container">
        <img
          className="card-img"
          src={ImageUrls[type]}
          alt="cat"
          onClick={() => onSelectImage(ImageUrls[type])}
          onLoad={handleImageLoaded}
        />
      </div>
      <div className={loading ? "show-loader" : "hide-loader"}>
        <Loader />
      </div>
    </div>
  );
};

export default ItemCard;
