import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../axios";
import { useServiceStore } from "../../stores/serviceStore";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AddService = () => {
  const state = useLocation().state;

  const [title, setTitle] = useState(state?.title || "");
  const [isLoading, setIsLoading] = useState(false);

  const addService = async (obj) => {
    setIsLoading(true);
    try {
      const { data } = state
        ? await axios.put(`/services/${state.id}`, obj)
        : await axios.post("/services", obj);
      setIsLoading(false);
      toast.success(data.message);
      !state && setTitle("");
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
      <div className="w-full md:w-[420px] md:h-[330px]  flex flex-col justify-center items-center gap-y-5 shadow-xl p-5  bg-white rounded-xl m-auto">
        <p>{state ? "სერვისის რედაქტირება" : "სერვისების დამატება"}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addService({ title: title });
          }}
          className="flex flex-col justify-center items-center gap-2 mb-3"
        >
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="outlined-required"
            autoFocus
            label="სერვისი"
            className="bg-white w-full"
            size="small"
          />
          {!isLoading ? (
            <Button
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

export default AddService;
