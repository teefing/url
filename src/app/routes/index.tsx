import { Route, Routes } from 'react-router-dom'
import IndexPage from '@/pages/index'

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<IndexPage />} />
        {/* Other Routes here */}
      </Route>
    </Routes>
  )
}

export default MyRoutes
