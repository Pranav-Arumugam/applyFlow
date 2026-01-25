import React from "react"
import { RouterProvider } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
// import HomeLayout from "./pages/HomeLayout"
// import Register from "./pages/Register"
import {
  DashboardLayout,
  HomeLayout,
  Register,
  Login,
  Error,
  Landing,
  AddJob,
  EditJob,
  Stats,
  Profile,
} from "./pages"
import DashboardLayout1 from "./pages/DashboardLayout1"
import JobsLayout from "./pages/JobsLayout"
import SingleJobView from "./pages/SingleJobView"
import DashboardHome from "./pages/DashboardHome"
import InterviewLayout from "./pages/InterviewLayout"
import InterviewCalendar from "./components/InterviewCalendar"
import InterviewModal from "./components/InterviewModal"
import ProtectedRoute from "./components/ProtectedRoute"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      retry: 1,
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          { path: "jobs", element: <JobsLayout /> },
          { path: "jobs/:id", element: <SingleJobView /> },
          { path: "jobs/new", element: <AddJob /> },
          { path: "jobs/:id/edit", element: <EditJob /> },
          {
            path: "interviews",
            element: <InterviewLayout />,
            children: [
              {
                index: true,
                element: <div>Interviews List</div>, // placeholder for now
              },
              {
                path: "calendar",
                element: <InterviewModal />,
              },
              // future:
              // { path: "new", element: <AddInterview /> },
              // { path: ":id", element: <InterviewDetail /> },
            ],
          },
          { path: "stats", element: <Stats /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
