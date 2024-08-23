// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import ErrorBoundary from './ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    {/* <StrictMode> */}
    <Provider store={store} >
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
    {/* </StrictMode> */}
  </>
)
