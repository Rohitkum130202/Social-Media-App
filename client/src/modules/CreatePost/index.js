import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    caption: "",
    desc: "",
    img: null,
  });

  const [url, setUrl] = useState("");

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", data.img);
      formData.append("upload_preset", "insta_clone");
      formData.append("cloud_name", "dgjglb16t");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgjglb16t/upload",
        formData
      );

      if (response.status === 200) {
        return response.data.secure_url;
      } else {
        throw new Error("Error uploading image to Cloudinary");
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadImage();
      const res = await axios.post(
        "http://localhost:8080/api/v1/new-post",
        {
          caption: data.caption,
          desc: data.desc,
          url: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user:token")}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during post creation:", error);
      message.error("Error while creating post");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border w-[800px] h-[600px] p-6">
        <form onSubmit={(e) => handleSubmit(e)}>
          <Input
            placeholder="Caption..."
            name="Title"
            className="py-4"
            value={data.caption}
            onChange={(e) => setData({ ...data, caption: e.target.value })}
          />
          <textarea
            rows={10}
            className="w-full border shadow p-4 resize-none"
            placeholder="Description"
            value={data.desc}
            onChange={(e) => setData({ ...data, desc: e.target.value })}
          />
          <div>
            <input
              type="file"
              name="image"
              className="py-4 hidden"
              id="image"
              onChange={(e) => setData({ ...data, img: e.target.files[0] })}
              required
            />
            <label
              htmlFor="image"
              className="cursor-pointer p-4 shadow w-full block"
            >
              {data.img ? data.img.name : "Upload file"}
            </label>
          </div>
          <Button label="Create Post" className="bg-[#f00f51]" />
        </form>
      </div>
    </div>
  );
};
