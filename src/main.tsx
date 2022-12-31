import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./pages/Posts/Posts";
import PostAdmin from "./pages/PostAdmin/PostAdmin";
import PostPreview from "./pages/PostPreview/PostPreview";
import "bootstrap/dist/css/bootstrap.min.css";
import EnhancedPostAdmin from "./pages/EnhancedPostAdmin/EnhancedPostAdmin";
import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import Tags from "./pages/Tags/Tags";
import CategoryAdmin from "./pages/CategoriesAdmin/CategoriesAdmin";
import TagAdmin from "./pages/TagAdmin/TagAdmin";
import EnhancedTagAdmin from "./pages/EnhancedTagAdmin/EnhancedTagAdmin";
import EnhancedCategoryAdmin from "./pages/EnhancedCategoryAdmin/EnhancedCategoryAdmin";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="posts">
            <Route index element={<Posts />} />
            <Route path="create" element={<PostAdmin />} />
            <Route path=":postId">
              <Route index element={<EnhancedPostAdmin />} />
              <Route path="preview" element={<PostPreview />} />
            </Route>
          </Route>
          <Route path="categories">
            <Route index element={<Categories />} />
            <Route path="create" element={<CategoryAdmin />} />
            <Route path=":categoryId">
              <Route index element={<EnhancedCategoryAdmin />} />
            </Route>
          </Route>
          <Route path="tags">
            <Route index element={<Tags />} />
            <Route path="create" element={<TagAdmin />} />
            <Route path=":tagId">
              <Route index element={<EnhancedTagAdmin />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
