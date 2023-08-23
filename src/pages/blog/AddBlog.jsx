import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import axios from "../../axios";
import Loading from "../../components/Loading";
import { Link, useLocation } from "react-router-dom";
import { uploadImg } from "../../utils/functions";

const AddBlog = () => {
  const state = useLocation().state;
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImage] = useState("");
  const [title, setTitle] = useState(state?.title || "");
  const [text, setText] = useState(state?.description || "");

  const addBlog = async (formData) => {
    setIsLoading(true);
    try {
      const { data } = state
        ? await axios.put(`/blog/${state.id}`, formData)
        : await axios.post("/blog", formData);
      setIsLoading(false);
      toast.success(data.message);
      !state && clearForm();
    } catch (error) {
      toast.error(error.response?.data);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = img ? await uploadImg(img, "blog") : state?.img;

    const formData = {
      title: title,
      description: text,
      image: imgUrl ? imgUrl : "",
    };

    await addBlog(formData);

    !state && handleClear();
  };

  const handleClear = () => {
    setTitle("");
    setText("");
  };

  if (isLoading) return <Loading />;
  return (
    <form
      onSubmit={onSubmit}
      className="h-[calc(100vh-1.75rem)] flex flex-col gap-3 pb-3 "
    >
      <div>
        <Link to={"/blog"}>
          {" "}
          <Button variant="contained">ბლოგი</Button>
        </Link>
      </div>
      <Dropzone onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-y-4 border-2 border-dashed border-indigo-400  p-5 cursor-pointer">
                {img ? (
                  <img
                    className="max-h-[100px] rounded"
                    src={img && URL.createObjectURL(img)}
                    alt=""
                  />
                ) : (
                  <img
                    className="max-h-[100px] rounded"
                    src={
                      state?.img &&
                      `https://api.eyeline.ge/uploads${state?.img}`
                    }
                    alt=""
                  />
                )}

                <p className="text-center">
                  ჩააგდეთ სურათი, ან დააჭირეთ ასარჩევად
                </p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        id="outlined-required"
        label="სათაური"
        className="bg-white"
        size="small"
      />
      <div className="h-full overflow-auto">
        <ReactQuill
          theme="snow"
          value={text}
          onChange={(value) => setText(value)}
          className="h-full  bg-white p-0 border-0 quill"
        />
      </div>
      <div className="text-center">
        <Button type="submit" variant="contained" className="w-1/3">
          {!state ? `დამატება` : `განახლება`}
        </Button>
      </div>
    </form>
  );
};

export default AddBlog;
