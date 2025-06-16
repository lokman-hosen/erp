
import { API_GET_HOME_SETTINGS } from "@/services/api/endpoints";
import { useQuery } from "react-query";
import { get } from "../services/api/api";

const useGetSetting = () => {
  const {
    isLoading,
    isError,
    error,
    data: settingsData,
  } = useQuery({
    queryKey: ["homesettingsData"],
    queryFn: () => get(API_GET_HOME_SETTINGS),
  });
  return { isLoading, isError, error, settingsData };
};

export default useGetSetting;
