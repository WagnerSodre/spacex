import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PostHogProvider } from 'posthog-js/react'

import App from './App.tsx'
import './index.css'
import './App.css'

const POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_API_KEY;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider apiKey={POSTHOG_API_KEY}>
      <App />
    </PostHogProvider>
  </StrictMode>,
)
