import { Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage/HomePage";
import { AppRoutes } from "routes";

const App = () => {
  return (
    <Routes>
      <Route path={AppRoutes.Home} element={<HomePage />} />
    </Routes>
  );
};

export default App;
