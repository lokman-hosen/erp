import React from "react";
import {
    Routes,
    Route, HashRouter as Router,
} from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import {message} from "antd";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "~/store";
import Layout from '~/layouts/Layouts'
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5*(60*1000), // 5 mins
            cacheTime: 10*(60*1000), // 10 mins
        },
    },
})
function App() {
    const [msg, contextHolder] = message.useMessage();

        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router >
                        <QueryClientProvider client={queryClient}  contextSharing={true}>
                            <Layout />
                        </QueryClientProvider>
                    </Router >
                </PersistGate>
            </Provider>
        )
    /*return (
        <div >
            {contextHolder}
            <Routes>
                <Route path='*' element={<DefaultLayout/>}/>

                {/!*<Route path="/" element={<Home />} />*!/}
            </Routes>
        </div>
    );*/
}

export default App;
