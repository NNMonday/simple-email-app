import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./screens/Login";
import Dashboard from './screens/Dashboard'
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute"
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Navigate to='/login' />} />
          <Route path="/main/email" element={
            <PrivateRoute>
              <Dashboard filter={'email'} />
            </PrivateRoute>} />

          <Route path="/main/email/inbox" element={
            <PrivateRoute>
              <Dashboard filter={'email/inbox'} />
            </PrivateRoute>} />
          <Route path="/main/email/sent" element={
            <PrivateRoute>
              <Dashboard filter={'email/sent'} />
            </PrivateRoute>} />
          <Route path="/main/email/reminder" element={
            <PrivateRoute>
              <Dashboard filter={'email/reminder'} />
            </PrivateRoute>} />
          <Route path="/main/email/spam" element={
            <PrivateRoute>
              <Dashboard filter={'email/spam'} />
            </PrivateRoute>} />
          <Route path="/main/email/favorite" element={
            <PrivateRoute>
              <Dashboard filter={'email/favorite'} />
            </PrivateRoute>} />
          <Route path="/main/email/junks" element={
            <PrivateRoute>
              <Dashboard filter={'email/junks'} />
            </PrivateRoute>} />
          <Route path="/main/email/drafts" element={
            <PrivateRoute>
              <Dashboard filter={'email/drafts'} />
            </PrivateRoute>} />

          <Route path="/main/email/inbox/:id" element={
            <PrivateRoute>
              <Dashboard filter={'email/inbox'} />
            </PrivateRoute>} />
          <Route path="/main/email/sent/:id" element={
            <PrivateRoute>
              <Dashboard filter={'email/sent'} />
            </PrivateRoute>} />
          <Route path="/main/email/reminder/:id" element={
            <PrivateRoute>
              <Dashboard filter={'email/reminder'} />
            </PrivateRoute>} />
          <Route path="/main/email/spam/:id" element={
            <PrivateRoute>
              <Dashboard filter={'email/spam'} />
            </PrivateRoute>} />
          <Route path="/main/email/favorite/:id" element={
            <PrivateRoute>
              <Dashboard filter={'email/favorite'} />
            </PrivateRoute>} />
          <Route path="/main/email/junks/:id" element={
            <PrivateRoute>
              <Dashboard filter={'email/junks'} />
            </PrivateRoute>} />
          <Route path="/main/email/drafts/:id" element={
            <PrivateRoute>
              <Dashboard filter={'email/drafts'} />
            </PrivateRoute>} />

          <Route path="/main/home" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>} />
          <Route path="/main/contact" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
