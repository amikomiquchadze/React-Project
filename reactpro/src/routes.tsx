import { Route, Routes } from "react-router-dom";
import Count from "./count/count";
import UserTable from "./users/user";
import NewUserForm from "./inputForm/inputForms";
import Login from "./loginPage/login";

const AppRoutes: React.FC = () => {
    return (
      <Routes>
        <Route path="/Count" element={<Count />} />
        <Route path="/users" element={<UserTable />} />
        <Route path="/counter/:age" element={<Count/>}/>
        <Route path="/inputForm" element={<NewUserForm/>}/>
        <Route path="/" element={<Login />} />

      </Routes>
    );
  };
  
  export default AppRoutes;