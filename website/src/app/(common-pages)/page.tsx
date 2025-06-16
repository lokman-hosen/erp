'use client'
import { get } from "@/src/services/api/api";
import { useQuery } from "react-query";


// if you use < use client > you can't use metadata object
// export const metadata = {
//   title: "home",
// };

const HomePage = () => {


  // DATA GATE METHOD  --------------------->>
  const DealsSection = () => {
    const {
      isLoading,
      isSuccess,
      isError,
      error,
      data: products,
    } = useQuery({
      queryKey: ["allProduct for dealsSection"],
      queryFn: () => get(`${process.env.NEXT_PUBLIC_API_URL}/products`),
    });
  }





  return (
    <div className="homepage-1">

      <h2>Welcome From Bit Pixel BD</h2>

    </div>
  );
};

export default HomePage;
