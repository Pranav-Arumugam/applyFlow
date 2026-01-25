import React from "react"
import { Navigate } from "react-router-dom"
import { useCurrentUser } from "../hooks/useAuth"
import LoadingDots from "./LoadingDots"
const ProtectedRoute = ({ children }) => {
  const { data: user, isLoading, error } = useCurrentUser()
  if (isLoading) {
    return <LoadingDots />
  }
  if (error || !user) {
    return <Navigate to={"/login"} replace />
  }
  return children
}

export default ProtectedRoute
