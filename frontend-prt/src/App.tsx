



import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blog from "./pages/BlogPost"; // Ensure this is imported
import Createblog from "./pages/Createblog";
import PUBLIC_ROUTES from "./utils/Publicroutes";

function App() {
  return (
    <Routes>
      <Route index path={PUBLIC_ROUTES.LAYOUT} element={<Layout />} />
      <Route path={PUBLIC_ROUTES.HOME} element={<Home />} />
      <Route path={`${PUBLIC_ROUTES.BLOG}/:id`} element={<Blog />} />  {/* Correct import */}
      <Route path={PUBLIC_ROUTES.CREATE} element={<Createblog />} />
    </Routes>
  );
}

export default App;
