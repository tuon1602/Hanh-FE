import React from "react";

const Upload = () => {
  const handleSelectedFile = (event) => {
    const selectedFile = event.target.files;
    const selectedFlesArray = Array.from(selectedFile);
    console.log(selectedFlesArray);
  };
  return (
    <div>
      <label htmlFor="images">Tải ảnh nhà hàng lên</label>
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        name="images"
        multiple
        accept="image/*"
        onChange={handleSelectedFile}
      />
    </div>
  );
};

export default Upload;
