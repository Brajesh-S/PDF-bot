import axios from "axios"; 


export async function uploadPDF(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(`http://localhost:8000/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.detail);
    }
  };

  