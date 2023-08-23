import { TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "../../axios";

const Info = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [workinghours, setWorkinghours] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //Fetch clinic information
  const fetchData = async () => {
    const { data } = await axios.get("/clinicdata");
    setPhone(data.phone);
    setEmail(data.email);
    setAddress(data.address);
    setWorkinghours(data.workinghours);
  };

  const saveData = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const { data } = await axios.put("/clinicdata", {
        phone: phone,
        email: email,
        address: address,
        workinghours: workinghours,
      });
      setIsLoading(false);
      toast.success(data.message);
    } catch (error) {
      toast.error("მოხდა შეცდომა");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-[calc(100vh-1.75rem)] flex justify-center items-center bg-gray-100">
      <div className="shadow-lg w-full md:w-[500px] py-10 rounded-md bg-white mx-3">
        <form
          onSubmit={saveData}
          className="flex flex-col justify-center items-center gap-4"
        >
          {" "}
          <h2 className="my-3 text-center text-indigo-700">
            კლინიკის მონაცემები
          </h2>
          <div className="w-2/3 flex flex-col gap-4">
            <TextField
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="outlined-required"
              label="ტელეფონი"
              className="bg-white w-100"
              size="small"
            />
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="outlined-required"
              label="იმეილი"
              className="bg-white w-100"
              size="small"
            />
            <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              id="outlined-required"
              label="მისამართი"
              className="bg-white w-100"
              size="small"
            />

            <TextField
              value={workinghours}
              onChange={(e) => setWorkinghours(e.target.value)}
              id="outlined-required"
              label="სამუშაო საათები"
              className="bg-white w-100"
              size="small"
            />
          </div>
          <Button className="w-1/2 mt-3" variant="contained" type="submit">
            {isLoading ? (
              <ClipLoader
                color={"white"}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <span> შენახვა</span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Info;
