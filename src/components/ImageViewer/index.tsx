import React, { useEffect } from "react";

interface ImageViewerProps {
  imgUrl: string;
  onDismissImage: () => void;
}

const imgStyle = {
  width: "600px",
  margin: "auto",
  display: "block",
  position: "absolute" as "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
};

const containerStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "absolute" as "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

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
    <div style={containerStyle}>
      <img style={imgStyle} src={imgUrl} alt={imgUrl} />
    </div>
  );
};

export default ImageViewer;
