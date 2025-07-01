import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PostHogProvider } from 'posthog-js/react'

import App from './App.tsx'
import { POSTHOG_API_KEY } from './config.ts'
import './index.css'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider apiKey={POSTHOG_API_KEY}>
      <App />
    </PostHogProvider>
  </StrictMode>,
)
