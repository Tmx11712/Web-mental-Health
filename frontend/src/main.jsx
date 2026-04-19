console.log("main.jsx is loading...");
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'

console.log("Checking for #root element...");
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("CRITICAL: #root element not found in DOM!");
} else {
  console.log("#root element found, proceeding to render...");
  try {
    const root = createRoot(rootElement);
    console.log("Root created, rendering...");
    root.render(
      <StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </StrictMode>
    );
    console.log("Render call completed.");
  } catch (err) {
    console.error("FATAL ERROR during render:", err);
  }
}

