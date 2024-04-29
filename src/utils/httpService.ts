/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { getCookie } from "./action"; // Assuming it retrieves cookies

export const getUserCacheKey = async (userId: string, url: string) => {
  return `user-data-${url}-${userId}`;
};

const removeCacheiIfNotFresh=async()=>{
  // const allData=localStorage.getItem()
}

// Custom function to check cache freshness (example logic can be adjusted)
function isFresh(data: any, timestamp: any) {
  const cacheExpiry = 60 * 60 * 1000; // 3600 seconds (adjust as needed)
  const currentTime = Date.now();
  return currentTime - timestamp < cacheExpiry;
}

export const httpservice = {
  get: async (url: any) => {
    const userId = await getUserFromSession(); // Replace with your user identification method
    const cacheKey = await getUserCacheKey(url, userId!);

    const cachedData = localStorage.getItem(cacheKey);
    const cachedDataParsed = cachedData && JSON.parse(cachedData);

    if (cachedDataParsed && isFresh(cachedDataParsed.data, cachedDataParsed.timeStamp)) {
      // Cache hit, return cached data and update cache in the background
      // console.log("Using cached data:", cachedDataParsed.data);
      updateCache(cacheKey, cachedDataParsed,url); // Initiate background cache update
      return cachedDataParsed.data;
    }

    // Cache miss or data might be stale, fetch from server
    // console.log("Fetching data from server for", url);
    const response = await axios.get(url);

    // Check for server response differences before updating cache
    const dataHasChanged = cachedDataParsed?.data !== response.data; //or data for new cache is fetched
    // console.log("cachedDataParsed",cachedDataParsed?.data,"response.data",response.data,"hello")
    if (dataHasChanged) {
      // console.log("Data on server has changed, updating cache");
    }

    const updatedCacheData = {
      data: response,
      timeStamp: Date.now(),
    };

    localStorage.setItem(cacheKey, JSON.stringify(updatedCacheData));
    return response;
  },

  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

// Optional background cache update function (for improved user experience)
async function updateCache(cacheKey: string, cachedData: any,url:string) {
  // console.log("Updating cache for", cacheKey, "in the background")
  const updatedResponse = await axios.get(url); // Refetch data
  const updatedCacheData = {
    data: updatedResponse,
    timeStamp: Date.now(),
  };

  // Update cache only if the key hasn't been invalidated in the meantime
  if (localStorage.getItem(cacheKey) === JSON.stringify(cachedData)) {
    localStorage.setItem(cacheKey, JSON.stringify(updatedCacheData));
  } else {
    // console.log("Cache update for", cacheKey, "skipped due to invalidation");
  }
}

// Replace with your user identification method (e.g., from session storage or context)
const getUserFromSession = async () => {
  const token = getCookie("token");
  // Implement logic to retrieve user ID from token (if applicable)
  return token;
};
