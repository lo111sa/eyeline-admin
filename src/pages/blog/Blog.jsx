import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "../../axios";
import { Button, Pagination } from "@mui/material";
import Confirm from "../../components/Confirm";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`/blog?page=${page}&limit=${10}`);
    setIsLoading(false);
    setItems(data.data);
    setPageCount(data.pageCount);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    const { data } = await axios.delete(`/blog/${id}`);
    const newPosts = items.filter((post) => post.id !== id);
    setItems(newPosts);
    setIsLoading(false);
    toast.success(data);
  };

  const handleChangePage = (e, value) => {
    setPage(value);
  };
  useEffect(() => {
    fetchPosts();
  }, [page]);

  if (isLoading) return <Loading />;
  return (
    <div className="h-[calc(100vh-1.75rem)] flex flex-col">
      <div className="mb-2">
        <Link to={"/blog/add"}>
          {" "}
          <Button variant="contained">ახალი პოსტი</Button>
        </Link>
      </div>
      <div className=" overflow-y-scroll">
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
              {items?.length
                ? items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img
                          className="rounded"
                          width={80}
                          src={`https://api.eyeline.ge/uploads${item.img}`}
                          alt={"blog-post-img"}
                        />
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell align="right">
                        <div className="flex justify-end items-center gap-4">
                          <Link to={"/blog/add"} state={item}>
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
      </div>

      <div className="d-flex justify-content-center my-5">
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />
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

export default Blog;
