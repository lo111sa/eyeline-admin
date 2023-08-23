import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import axios from "../../axios";
import Loading from "../../components/Loading";
import { Link, useLocation } from "react-router-dom";
import { uploadImg } from "../../utils/functions";

const AddOffer = () => {
  const state = useLocation().state;
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImage] = useState("");
  const [title, setTitle] = useState(state?.title || "");
  const [text, setText] = useState(state?.text || "");
  const [oldPrice, setOldPrice] = useState(state?.oldPrice || 0);
  const [newPrice, setNewPrice] = useState(state?.newPrice || 0);

  const addOffer = async (formData) => {
    try {
      if (!state) {
        setIsLoading(true);
        const res = await axios.post("/offers", formData);
        setIsLoading(false);
        toast.success(res.data.message);
      } else {
        setIsLoading(true);
        const res = await axios.put(`/offers/${state.id}`, formData);
        setIsLoading(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = img ? await uploadImg(img, "offers") : state?.img;
    const formData = {
      title,
      text,
      oldPrice,
      newPrice,
      image: imgUrl ? imgUrl : "",
    };

    await addOffer(formData);

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
      className="h-[calc(100vh-1.75rem)] flex flex-col gap-3 pb-3"
    >
      <div>
        <Link to={"/offers"}>
          {" "}
          <Button className="" variant="contained">
            აქციები
          </Button>
        </Link>
      </div>
      <Dropzone onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-y-4 border-2 border-dashed  border-indigo-400  p-5 cursor-pointer">
                {img ? (
                  <img
                    className="max-h-[100px] rounded"
                    src={URL.createObjectURL(img)}
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
      <div className="flex flex-col md:flex-row gap-4">
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="outlined-required"
          label="სათაური"
          className="bg-white w-full"
          size="small"
        />

        <TextField
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
          id="outlined-required"
          label="ძველი ფასი"
          className="bg-white"
          size="small"
          onFocus={(event) => {
            event.target.select();
          }}
        />

        <TextField
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          id="outlined-required"
          label="ახალი ფასი"
          className="bg-white"
          size="small"
          onFocus={(event) => {
            event.target.select();
          }}
        />
      </div>
      <div className="h-full overflow-auto">
        <ReactQuill
          theme="snow"
          value={text}
          onChange={(value) => setText(value)}
          className="h-full  bg-white p-0 border-0"
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

export default AddOffer;
