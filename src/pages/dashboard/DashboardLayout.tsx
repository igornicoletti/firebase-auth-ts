import { Outlet } from 'react-router-dom'

export const DashboardLayout = () => {
  return (
    <div className='min-h-screen grid place-items-center px-4 py-6'>
      <div className='w-full max-w-sm'>
        <Outlet />
      </div>
    </div>
  )
}
