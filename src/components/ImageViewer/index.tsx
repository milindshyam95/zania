import React, { useEffect } from "react";
import "./index.css";

interface ImageViewerProps {
  imgUrl: string;
  onDismissImage: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  imgUrl,
  onDismissImage,
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismissImage();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onDismissImage]);

  return (
    <div className="expanded-container">
      <img className="expanded-img" src={imgUrl} alt={imgUrl} />
    </div>
  );
};

export default ImageViewer;
