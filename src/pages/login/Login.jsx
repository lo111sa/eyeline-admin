import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { shallow } from "zustand/shallow";
import Loading from "../../components/Loading";

const Login = () => {
  const { login, isLoading, message } = useAuthStore((state) => state, shallow);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    await login(data);
  };

  if (isLoading) return <Loading />;

  return (
    <div
      onSubmit={handleSubmit}
      className="h-screen flex items-center justify-center bg-slate-300"
    >
      <form className="w-full md:w-[420px] md:h-[330px]  flex flex-col justify-center items-center gap-y-5 shadow-xl p-5 mx-3 bg-white rounded-xl">
        <h1 className="text-2xl">ავტორიზაცია</h1>
        <div className="w-full md:w-3/4 flex flex-col gap-y-7">
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            id="outlined-required"
            label="მომხმარებელი"
            className="bg-white w-100"
          />

          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            label="პაროლი"
            className="bg-white w-100"
          />
        </div>
        <span className="text-sm text-center text-red-500">
          {message && message}
        </span>
        <Button variant="contained" type="submit" className="w-1/2 mt-3">
          შესვლა
        </Button>
      </form>
    </div>
  );
};

export default Login;
