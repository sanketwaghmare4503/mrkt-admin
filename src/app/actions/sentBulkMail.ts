"use server"
import { BulkMailFormData } from "../utils/__validators";
import { BASE_URL } from "../utils/utils";



export const sendBulkMailAPI = async ( endpoint: string,data: BulkMailFormData,) => {


    try {
      const response = await fetch(`${BASE_URL + endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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