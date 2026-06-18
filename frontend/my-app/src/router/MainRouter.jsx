import { Route } from "react-router-dom";
import Login from "../pages/Login";

function MainRouter() {
  return (
    <>
      <Route path="/login" element={<Login />} />
    </>
  );
}

export default MainRouter;