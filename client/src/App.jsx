import { useEffect } from "react";
import TextEditor from "./TextEditor";
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {    
    navigate(`/documents/${uuidV4()}`);
  }, []); 

  return <></>; 
};

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <Home />,
  },
  {
    path: '/documents/:id',
    element: <TextEditor />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
