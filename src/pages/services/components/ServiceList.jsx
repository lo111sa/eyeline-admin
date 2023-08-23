import React, { useEffect, useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";
import axios from "../../../axios";
import ClipLoader from "react-spinners/ClipLoader";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { useServiceStore } from "../../../stores/serviceStore";
import SubServiceAdd from "./SubServiceAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";

const ServiceList = () => {
  const {
    services,
    fetchServices,
    deleteService,
    subServices,
    fetchSubServices,
    setActiveService,
    setActiveSubService,
    activeService,
    activeSubService,
    deleteSubService,
  } = useServiceStore((state) => state);

  const [state, setState] = useState({});
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <Link className="w-full mb-2" to="/services/add">
        <Button className="w-full" variant="contained">
          სერვისის დამატება
        </Button>
      </Link>
      {services?.length
        ? services.map((item, index) => {
            return (
              <Accordion
                key={item.id}
                expanded={expanded === index}
                onChange={handleChange(index)}
              >
                <AccordionSummary
                  style={{
                    borderRadius: "5px",
                    backgroundColor: expanded === index && "#82a6fa",
                    color: expanded === index && "#fff",
                  }}
                  onClick={() => {
                    fetchSubServices(item.id);
                    setActiveService(item.id, item.title);
                  }}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2 ">
                      <Link to={"/services/add"} state={item}>
                        <button onClick={() => setState(item)}>
                          {" "}
                          <EditIcon className="cursor-pointer" />
                        </button>
                      </Link>
                      <h2 className="text-sm">{item.title}</h2>
                    </div>
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={async () => {
                          await deleteService(item.id);
                        }}
                      >
                        <DeleteForeverIcon className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </AccordionSummary>
                <Link className="w-full" to="/services/subservices/add">
                  <Button className="w-full" variant="outlined">
                    ქვე-სერვისის დამატება
                  </Button>
                </Link>
                <ul className="p-1 max-h-[350px]">
                  {subServices?.length
                    ? subServices.map((item) => {
                        return (
                          <li
                            key={item.id}
                            onClick={() => {
                              setActiveSubService(item.id, item.title);
                            }}
                            className={`w-full cursor-pointer p-2 hover:bg-indigo-100 rounded-md  border-b ${
                              activeSubService.id === item.id && "bg-indigo-200"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Link
                                  to={"/services/subservices/add"}
                                  state={item}
                                >
                                  <button onClick={() => setState(item)}>
                                    {" "}
                                    <EditIcon className="cursor-pointer" />
                                  </button>
                                </Link>

                                <div className="flex items-center gap-2">
                                  {item?.img ? (
                                    <img
                                      className="object-cover w-[25px] h-[25px] rounded-full"
                                      width={25}
                                      height={25}
                                      src={`https://api.eyeline.ge/uploads${item.img}`}
                                      alt="service-img"
                                    />
                                  ) : null}
                                  {item.title}
                                </div>
                              </div>
                              <button
                                className="text-red-500  border border-transparent w-6 h-6 hover:border-red-300 hover:rounded-full duration-300"
                                onClick={async () => {
                                  await deleteSubService(item.id);
                                }}
                              >
                                X
                              </button>
                            </div>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </Accordion>
            );
          })
        : null}
    </>
  );
};

export default ServiceList;
