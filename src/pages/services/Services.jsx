import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "../../axios";
import { Pagination, Button } from "@mui/material";
import Confirm from "../../components/Confirm";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ServiceList from "./components/ServiceList";
import { useServiceStore } from "../../stores/serviceStore";
import { shallow } from "zustand/shallow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Services = () => {
  const { posts, isPostsLoading, activeSubService, fetchPosts, pageCount } =
    useServiceStore((state) => state, shallow);
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDelete = async (id) => {
    const { data } = await axios.delete(`/subservicesinfo/${id}`);
    fetchPosts(activeSubService.id, page, 10);
    toast.success(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchPosts(activeSubService.id, page, 10);
  }, [page, activeSubService.id]);

  //if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col relative h-[calc(100vh-1.75rem)] md:flex-row gap-2">
      <div className="w-full flex flex-col md:w-1/4 min-w-[290px] overflow-auto shadow-lg p-1">
        <ServiceList />
      </div>
      <div className="w-full md:w-3/4 flex flex-col justify-between">
        <div className=" overflow-y-auto flex flex-col justify-between">
          <div className="mb-2">
            {activeSubService.id && (
              <Link to={"/services/post/add"}>
                {" "}
                <Button variant="contained">დამატება</Button>
              </Link>
            )}
          </div>
          {isPostsLoading ? (
            <Loading />
          ) : (
            <TableContainer component={Paper}>
              <Table aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <span className="font-bold">სურათი</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold">სათაური</span>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts?.length
                    ? posts.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            {item?.img && (
                              <img
                                className="rounded"
                                width={80}
                                src={`https://api.eyeline.ge/uploads${item.img}`}
                                alt={"blog-post-img"}
                              />
                            )}
                          </TableCell>
                          <TableCell>{item.title}</TableCell>
                          <TableCell align="right">
                            <div className="flex justify-end items-center gap-4">
                              <Link to={"/services/post/add"} state={item}>
                                <EditIcon className="cursor-pointer" />
                              </Link>
                              <button
                                onClick={() => {
                                  setDeleteId(item.id);
                                  setOpen(true);
                                }}
                              >
                                <DeleteForeverIcon className="text-red-500" />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <div className="d-flex justify-content-center my-2 z-[-999px]">
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
            />
          </div>
        </div>
      </div>
      <Confirm
        id={deleteId}
        visible={open}
        handleConfirm={handleDelete}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Services;
