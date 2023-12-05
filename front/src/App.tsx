import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CRUD from "./components/CRUD/CRUD";
import "./App.css";
import CRUDPostCreator from "./components/CRUD/PostCreator/CRUD-PostCreator";
import Context from "./assets/services/Context";
import { useState } from "react";
import CRUDSinglePost from "./components/CRUD/SinglePost/CRUD-SinglePost";

const baseUrl = "http://localhost:6006";

function App() {
  const [currentId, setId] = useState(0);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <CRUD />,
    },
    {
      path: "/posts/new",
      element: <CRUDPostCreator />,
    },
    { path: "/posts/:postId", element: <CRUDSinglePost /> },
  ]);

  return (
    <Context.Provider value={{ currentId, setId, baseUrl }}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}

export default App;
