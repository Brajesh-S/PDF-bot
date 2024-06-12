import axios from "axios"; 


export async function uploadPDF(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(`https://pdf-bot-qycp.onrender.com/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.detail);
    }
  };

  