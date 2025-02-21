import { BrowserRouter, Routes, Route } from "react-router";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { UserContextProvider } from "./components/context/UserContext";
import { TasksContextProvider } from "./components/context/TaskContext";

import "./App.css";
import { GuardRoutes } from "./lib/GuardRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route element={<GuardRoutes />}>
              <Route
                path="/dashboard"
                element={
                  <TasksContextProvider>
                    <Dashboard />
                  </TasksContextProvider>
                }
              />
            </Route>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
