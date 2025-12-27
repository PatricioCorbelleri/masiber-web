import { useState } from "react";
import { imageUploader } from "../styles";

export default function ImageUploader({ images, setImages }) {
  const [error, setError] = useState("");

  const handleFiles = (files) => {
    const list = Array.from(files);

    if (images.length + list.length > 6) {
      setError("Máximo 6 imágenes");
      return;
    }

    const valid = list.filter(
      (f) =>
        f.type.startsWith("image/") && f.size <= 5 * 1024 * 1024
    );

    setImages([...images, ...valid]);
    setError("");
  };

  return (
    <div>
      <div
        style={imageUploader.dropZone}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() =>
          document.getElementById("image-uploader-input").click()
        }
      >
        Arrastrá imágenes acá o hacé click
        <input
          id="image-uploader-input"
          type="file"
          multiple
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && <p style={imageUploader.error}>{error}</p>}

      <div style={imageUploader.previewGrid}>
        {images.map((img, i) => (
          <img
            key={i}
            src={URL.createObjectURL(img)}
            alt=""
            style={imageUploader.previewImg}
          />
        ))}
      </div>
    </div>
  );
}
