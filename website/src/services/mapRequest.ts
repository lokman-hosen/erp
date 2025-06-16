import { apiEndpoint } from "./apiEndpoint";
import { apiRequest } from "./interceptor/api.interceptor";

const getNearByPlaces = ({ lat, lng, radius, type }: any) => {
  return apiRequest(
    apiEndpoint.careHomeDetails.findNearByPlaces
      .replace(":lat", lat)
      .replace(":lng", lng)
      .replace(":radius", radius)
      .replace(":type", type),
    {
      method: "GET",
    }
  );
};

export { getNearByPlaces };
