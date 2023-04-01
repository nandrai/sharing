import React, { useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "/api";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileId, setFileId] = useState("");

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileName = (event) => {
    setFileName(event.target.value);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("filename", fileName);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert(`Copy this Id: ${response.data.fileId}`);
      setSelectedFile(null);
      setFileName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute flex items-center justify-center w-full h-screen  bg-gray-800">
      <form onSubmit={handleFileUpload} className="flex flex-col gap-2">
        <div>
          <h2>Upload a file</h2>
          <input type="file" onChange={handleFileSelect} />
        </div>
        <div>
          <button type="submit" className="p-2 bg-white">
            Upload
          </button>
        </div>
      </form>
      <div className="flex gap-2">
        <input
          type="text"
          value={fileId}
          onChange={(e) => setFileId(e.target.value)}
        />
        <a
          href={`${axios.defaults.baseURL}/download/${fileId}`}
          className="p-2 bg-white"
        >
          Download File
        </a>
      </div>
    </div>
  );
}

export default App;
