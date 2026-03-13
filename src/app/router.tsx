import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AppLayout from "@/components/layout/AppLayout"
import Dashboard from "@/features/dashboard/Dashboard"
import Login from "@/features/auth/Login"
import OutletsPage from "@/features/outlets/OutletsPage"
import UsersPage from "@/features/users/UsersPage"
import SettingsPage from "@/features/settings/SettingsPage"
import NotFound from "@/features/NotFound"
import ProtectedRoute from "./ProtectedRoute"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/outlets" element={<OutletsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
