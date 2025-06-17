"use server"
import { TemplateFormData } from "../utils/__validators";
import { BASE_URL } from "../utils/utils";

export const createTempleteAPI = async (data: TemplateFormData, endpoint: string) => {
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


  export const getTemplatesAPI = async ( endpoint: string) => {
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


  export const deleteTemplateAPI=async ( endpoint: string) => {
    try {
      const response = await fetch(`${BASE_URL + endpoint}`, {
        method: "DELETE",
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


  export const restoreTemplateAPI=async ( endpoint: string) => {
    try {
      const response = await fetch(`${BASE_URL + endpoint}`, {
        method: "PUT",
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


  export const getSingleTemplate=async ( endpoint: string) => {
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

  export const updateTemplateAPI=async ( data:TemplateFormData,endpoint: string) => {
    try {
      const response = await fetch(`${BASE_URL + endpoint}`, {
        method: "PUT",
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

