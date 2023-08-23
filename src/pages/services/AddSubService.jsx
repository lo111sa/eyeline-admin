import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../axios";
import { useServiceStore } from "../../stores/serviceStore";
import ClipLoader from "react-spinners/ClipLoader";
import Dropzone from "react-dropzone";
import { uploadImg } from "../../utils/functions";
import { Link, useLocation } from "react-router-dom";

const AddSubService = () => {
  const state = useLocation().state;
  const { fetchSubServices, activeService } = useServiceStore((state) => state);
  const [title, setTitle] = useState(state?.title || "");
  const [img, setImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addSubService = async (obj) => {
    setIsLoading(true);
    try {
      const { data } = state
        ? await axios.put(`/subservices/${state.id}`, obj)
        : await axios.post("/subservices", obj);
      setIsLoading(false);
      toast.success(data.message);
      !state && setTitle("");
      !state && setImg("");
    } catch (error) {
      toast.error(error.response?.data);
    }
  };

  return (
    <div>
      <div>
        <Link to="/services">
          {" "}
          <Button variant="contained">სერვისები</Button>
        </Link>
      </div>
      <div className="w-full md:w-[420px] md:h-[430px]  flex flex-col justify-center items-center gap-y-5 shadow-xl p-5  bg-white rounded-xl m-auto">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const imgUrl = img
              ? await uploadImg(img, "subServices")
              : state?.img;
            addSubService({
              title: title,
              description: "",
              serviceId: activeService.id,
              image: imgUrl ? imgUrl : "",
            });
          }}
          className="flex flex-col items-center justify-center gap-4 my-3 px-2 pb-2"
        >
          <div className="flex flex-col items-center  gap-4 w-full">
            <p>
              {state ? "ქვე-სერვისის რედაქტირება" : "ქვე-სერვისების დამატება"}
            </p>
            <Dropzone onDrop={(acceptedFiles) => setImg(acceptedFiles[0])}>
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
              id="outlined-required"
              autoFocus
              label="ქვე-სერვისის დამატება"
              className="bg-white w-full"
              size="small"
            />
          </div>
          {!isLoading ? (
            <Button
              className="w-full"
              type="submit"
              disabled={!title ? true : false}
              variant="contained"
            >
              {!state ? `დამატება` : `განახლება`}
            </Button>
          ) : (
            <ClipLoader
              color={"blue"}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default AddSubService;
