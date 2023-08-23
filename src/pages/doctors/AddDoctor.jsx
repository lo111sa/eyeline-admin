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

const AddDoctor = () => {
  const state = useLocation().state;
  const [name, setName] = useState(state?.name || "");
  const [lastName, setLastName] = useState(state?.lastName || "");
  const [specialty, setSpecialty] = useState(state?.specialty || "");
  const [education, setEducation] = useState(state?.education || "");
  const [email, setEmail] = useState(state?.email || "");
  const [jobExperience, setJobExperience] = useState(
    state?.jobExperience || ""
  );
  const [phone, setPhone] = useState(state?.phone || "");
  const [img, setImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onQuillChange = (value) => {
    setJobExperience(value);
  };

  const clearForm = () => {
    setName("");
    setLastName("");
    setSpecialty("");
    setEducation("");
    setEmail("");
    setJobExperience("");
    setPhone("");
    setImg("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = img ? await uploadImg(img, "doctors") : state?.img;

    const formData = {
      name,
      lastName,
      specialty,
      education,
      email,
      jobExperience,
      phone,
      image: imgUrl ? imgUrl : "",
    };

    setIsLoading(true);
    try {
      const { data } = state
        ? await axios.put(`/doctors/${state.id}`, formData)
        : await axios.post("/doctors", formData);
      setIsLoading(false);
      toast.success(data.message);
      !state && clearForm();
    } catch (error) {
      toast.error(error.response?.data);
    }
  };

  if (isLoading) return <Loading />;
  return (
    <form
      onSubmit={onSubmit}
      className="h-[calc(100vh-1.75rem)] flex flex-col gap-3 pb-3"
    >
      <div>
        <Link to={"/doctors"}>
          {" "}
          <Button variant="outlined">ექიმები</Button>
        </Link>
      </div>
      <Dropzone onDrop={(acceptedFiles) => setImg(acceptedFiles[0])}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-y-4 border-2 border-dashed border-indigo-400  p-5 cursor-pointer">
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          id="outlined-required"
          label="სახელი"
          className="bg-white w-full"
          size="small"
        />
        <TextField
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          id="outlined-required"
          label="გვარი"
          className="bg-white w-full"
          size="small"
        />
        <TextField
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          id="outlined-required"
          label="სპეციალობა"
          className="bg-white w-full"
          size="small"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="outlined-required"
          label="იმეილი"
          className="bg-white w-full"
          size="small"
        />
        <TextField
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          id="outlined-required"
          label="ტელეფონი"
          className="bg-white w-full"
          size="small"
        />
      </div>
      <TextField
        value={education}
        onChange={(e) => setEducation(e.target.value)}
        id="outlined-multiline-flexible"
        label="განათლება"
        multiline
        maxRows={4}
      />
      <div className="h-full overflow-auto">
        <ReactQuill
          theme="snow"
          value={jobExperience}
          onChange={(value) => onQuillChange(value)}
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

export default AddDoctor;
