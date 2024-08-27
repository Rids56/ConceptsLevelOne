import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RedirectTo } from './component/RedirectTo';

const router = createBrowserRouter(RedirectTo);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App