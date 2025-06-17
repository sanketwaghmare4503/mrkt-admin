import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; 
  const formattedHour = hours.toString().padStart(2, '0');

  return `${day} ${month} ${year} | ${formattedHour}:${minutes} ${ampm}`;
}


  export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));
  