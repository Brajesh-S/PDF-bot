import axios from "axios";

export async function chat(message) {
    try {
        const res = await axios.post("https://pdf-bot-qycp.onrender.com/chat/", {
            question: message,
        });

        // Always return response content as a string
        return {
            status: res.status,
            message: res.status === 202 ? 'Please upload the PDF to continue.' : res.data.response.response.toString(),
        };
    } catch (e) {
        if (e.response) {
            return {
                status: e.response.status,
                message: e.response.data.message || 'An error occurred. Please try again later.',
            };
        } else {
            throw e;
        }
    }
}
