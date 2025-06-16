"use client";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reduxStore } from "../redux/store";

const Providers = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <Provider store={reduxStore}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider >
          {children}
          <ToastContainer />
        </SessionProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default Providers;
