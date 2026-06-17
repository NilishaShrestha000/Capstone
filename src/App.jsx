import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import router from './Routes/router'
import { ThemeProvider } from './auth/ThemeContext'

function App() {
  return (
    <>

      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>

    </>
  )
}
export default App;
