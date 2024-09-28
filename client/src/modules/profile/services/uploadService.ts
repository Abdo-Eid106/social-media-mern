import axios from "axios";

const upload = (url: string) => async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axios.post("http://localhost:3000" + url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data as { url: string };
};

export const uploadProfilePhoto = upload("/profilephoto");
export const uploadCoverPhoto = upload("/coverphoto");
