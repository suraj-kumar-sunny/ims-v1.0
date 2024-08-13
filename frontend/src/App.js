import React from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from './pages/admin/ForgotPassword';
import ResetPassword from './pages/admin/ResetPassword';
import Home from './pages/Home';
import Login from './pages/admin/Login';
import Register from './pages/admin/Register';
import NotFound from './pages/admin/NotFound';

const AppTheme = () => {
  const { theme } = useTheme();
  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} /> {/* 404 Page */}
        </Routes>
      </Router>
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppTheme />
    </ThemeProvider>
  );
}

export default App;
