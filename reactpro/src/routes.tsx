import { Route, Routes } from "react-router-dom";
import Count from "./count/count";
import UserTable from "./users/user";

const AppRoutes: React.FC = () => {
    return (
      <Routes>
        <Route path="/Count" element={<Count />} />
        <Route path="/users" element={<UserTable />} />
      </Routes>
    );
  };
  
  export default AppRoutes;