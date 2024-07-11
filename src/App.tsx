import Landing from "./screens/Landing.tsx";
import { Toaster } from "react-hot-toast";
import Dashboard from "./screens/Dashboard.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

function App() {
  return (
    <div className={"md:h-[100vh] pb-14"}>
      <Provider store={store}>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
