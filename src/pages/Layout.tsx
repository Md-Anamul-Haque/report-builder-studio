// // import { Card } from '@/components/ui/card'
// import { useDispatch, useSelector } from '@/lib/redux'
// import axios from 'axios'
// import { useCallback, useEffect, useState } from 'react'
import { Providers } from '@/lib/providers'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
   
    // const handleKeyDown = useCallback((event: KeyboardEvent) => {
    //     // Check if Control key and 'b' key are pressed
    //     if (event.ctrlKey && event.key === 'b') {
    //         // Trigger an alert
    //         setOpenSidebar(p => !p)
    //     }
    // }, []);

    // useEffect(() => {
    //     // Add event listener when the component mounts
    //     window.addEventListener('keydown', handleKeyDown);

    //     // Remove event listener when the component unmounts
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, [])
    // useEffect(() => {
    //     if (user.isAuth == 'no') {
    //         navigate('/login')
    //     }
    // }, [user.isAuth])
    // const [openSidebar, setOpenSidebar] = useState(false)
    return (
        <Providers>
            {/* <Navbar setOpenSidebar={setOpenSidebar} /> */}
            <div className='w-full flex h-full'>
                {/* make a modal if user.isAuth =='no' then open  */}
                {/* 
                {user.isAuth == 'no'
                    && <Card className='fixed inset-0 h-full w-full bg-orange-500'>
                        <h1 className='text-center text-2xl font-bold'>Please Login</h1>
                        <h1 className='text-center text-2xl font-bold'>{user.data.first_name}</h1>
                    </Card>}
                     */}
                {/* <Sidebar open={openSidebar} /> */}
                <div className='w-full overflow-auto'>
                    <Outlet />
                </div>
            </div>
        </Providers>
    )
}

export default Layout