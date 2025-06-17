"use server"

import { BASE_URL } from "../utils/utils";

 export const getLogsByStatus = async ( endpoint: string) => {

    try {
      const response = await fetch(`${BASE_URL + endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        const error = await response.json();
        console.error("Server responded with error:", error);
        throw new Error(error?.message || "An error occurred!");
      }
    } catch (error: any) {
        throw new Error(error?.message || "An error occurred!");
    }
  };




  export const getLogCount = async ( endpoint: string) => {

    try {
      const response = await fetch(`${BASE_URL + endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        const error = await response.json();
        console.error("Server responded with error:", error);
        throw new Error(error?.message || "An error occurred!");
      }
    } catch (error: any) {
        throw new Error(error?.message || "An error occurred!");
    }
  };