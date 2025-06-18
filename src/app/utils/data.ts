export const statusOptions = [
    { label: "All", value: "-1" },
    { label: "Delivered", value: "0" },
    { label: "Failed", value: "1" },
  ];

  export const recipientOptions = [
    { label: "All", value: "-1" },
    { label: "User", value: "0" },
    { label: "Comapany", value: "1" },
  ];


  // Map tab values to event types
export const EVENT_TYPES: Record<string, string> = {
    "0":"all",
    "1": "contactSales",
    "2": "bookDemo",
    "3": "requestCall",
    "4": "bookDemoLead",
    "5": "resourceRequest"
  };

  