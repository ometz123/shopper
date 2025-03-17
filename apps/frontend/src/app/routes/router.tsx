import { FC, lazy, memo, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import ROUTES from '../routes/routes.enum'

const LzyShop = lazy(() => import('../../pages/Shop'))

const AppRouter: FC = () => {
  return <>
    <Routes>
        <Route index path={ROUTES.HOME} element={<LzyShop />} />
    </Routes>
  </>
}

export default memo(AppRouter)
