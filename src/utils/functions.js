import axios from "../axios";

export const uploadImg = async (img, folder) => {
  try {
    const formData = new FormData();
    formData.append("image", img);
    const res = await axios.post(`/upload/${folder}`, formData);
    return res.data;
  } catch (err) {
    console.log(err.response.data);
  }
};
