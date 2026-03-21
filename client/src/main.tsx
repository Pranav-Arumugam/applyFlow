import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"
import App from "./App"

// fetch("/api/v1/test")
//   .then((res) => res.json())
//   .then((data) => console.log(data))
const rootElement = document.getElementById("root")
if(!rootElement) throw new Error("Root Element not found")
createRoot(rootElement).render(
  <StrictMode>
    <App />
    <ToastContainer
      position='top-left'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
      transition={Zoom}
    />
  </StrictMode>,
)
