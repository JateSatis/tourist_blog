import { Routes, Route } from "react-router-dom";

import Layout from "./Layout.jsx";

import MainPage from "./pages/MainPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import FindPlacesPage from "./pages/FindPlacesPage.jsx";
import PlacePage from "./pages/PlacePage.jsx";
import EditPlacePage from "./pages/EditPlacePage.jsx";
import CreatePlace from "./pages/CreatePlace.jsx";

import './styles/app.css'

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <MainPage />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <ProfilePage />
          </Layout>
        }
      />
      <Route
        path="/find"
        element={
          <Layout>
            <FindPlacesPage />
          </Layout>
        }
      />
      <Route
        path="/places/details/:id"
        element={
          <Layout>
            <PlacePage />
          </Layout>
        }
      />
      <Route
        path="/places/edit/:id"
        element={
          <Layout>
            <EditPlacePage />
          </Layout>
        }
      />
      <Route
        path="/places/create"
        element={
          <Layout>
            <CreatePlace />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
