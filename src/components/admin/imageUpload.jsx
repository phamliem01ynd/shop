import React from "react";
import { useState } from "react";
function ImageUpload() {
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "enndme-product");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dq35gn0cg/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    console.log(result);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ImageUpload;
