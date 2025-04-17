const getBaseURL = () => {
    return import.meta.env.VITE_API_BASE_URL || "http://localhost";
  };
  
  
  export const getFullAPI = (endpoint) => {
    return `${getBaseURL()}/webvoteKTB/backend/${endpoint}`;
  };
  