import { toast } from "react-toastify";
import axios from "../axios";
import { create } from "zustand";

export const useServiceStore = create((set, get) => ({
  //services
  services: [],
  isServiceLoading: false,
  activeService: { id: null, name: "" },

  //subservices
  subServices: [],
  isSubServiceLoading: false,
  activeSubService: { id: null, name: "" },

  //posts
  posts: [],
  isPostsLoading: false,
  pageCount: 0,

  /////////////////////services//////////////////////
  //fetch services
  fetchServices: async () => {
    try {
      set({
        isServiceLoading: true,
        services: [],
      });
      const { data } = await axios.get("/services");
      set({ isServiceLoading: false, services: data });
    } catch (error) {
      set({ isServiceLoading: false, message: error.response?.data });
    }
  },

  //Set active service
  setActiveService: (id, name) => {
    set({ activeService: { id: id, name: name } });
  },

  //Delete  service
  deleteService: async (serviceId) => {
    try {
      const res = await axios.delete(`services/${serviceId}`);
      set((state) => ({
        services: state.services.filter((item) => item.id !== serviceId),
      }));
      toast.success(res.data);
    } catch (error) {
      toast.error(error.response?.message);
    }
  },

  /////////////////////SubServices/////////////////////
  //fetch subservices
  fetchSubServices: async (id) => {
    try {
      set({
        isSubServiceLoading: true,
        subServices: [],
        activeSubService: { id: null, name: "" },
      });
      const { data } = await axios.get(`/subservices/${id}`);
      set({ isSubServiceLoading: false, subServices: data.data });
    } catch (error) {
      set({ isSubServiceLoading: false, message: error.response?.data });
    }
  },

  //Set active subService
  setActiveSubService: (id, name) => {
    set({ activeSubService: { id: id, name: name } });
  },

  //Delete sub service
  deleteSubService: async (serviceId) => {
    try {
      const res = await axios.delete(`subservices/${serviceId}`);
      set((state) => ({
        subServices: state.subServices.filter((item) => item.id !== serviceId),
      }));
      toast.success(res.data);
    } catch (error) {
      toast.error(error.response?.message);
    }
  },

  ///////////////////////Posts///////////////////////
  //fetch posts
  fetchPosts: async (id, page, limit) => {
    try {
      set({
        isPostsLoading: true,
        posts: [],
      });
      const { data } = await axios.get(
        `/subservicesinfo/${id}?page=${page}&limit=${limit}`
      );
      set({
        isPostsLoading: false,
        posts: data.data,
        pageCount: data.pageCount,
      });
    } catch (error) {
      set({ isPostsLoading: false, message: error.response?.data });
    }
  },
}));
