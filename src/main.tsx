import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./pages/Posts/Posts";
import PostAdmin from "./pages/PostAdmin/PostAdmin";
import PostPreview from "./pages/PostPreview/PostPreview";
import "bootstrap/dist/css/bootstrap.min.css";
import EnhancedPostAdmin from "./components/EnhancedPostAdmin/EnhancedPostAdmin";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Posts />} />
          <Route path="posts">
            <Route path="create" element={<PostAdmin />} />
            <Route path=":postId">
              <Route index element={<EnhancedPostAdmin />} />
              <Route path="preview" element={<PostPreview />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
