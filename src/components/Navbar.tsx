import { ModeToggle } from '@/components/mode-toggle'
import MyLogo from '/my_Logo.svg'

export default function NavBar() {
    return (
        <div className='fixed top-0 z-10 flex w-full items-center justify-between p-5 backdrop-blur-xl'>
            <div className='flex items-center justify-center gap-6'>
                <div className='flex items-center gap-3'>
                    <img src={MyLogo} alt='My Logo' className='h-10' />
                    <p className='text-3xl font-semibold'>Actionable</p>
                </div>
            </div>
            <div className='flex items-center gap-5'>
                <ModeToggle />
            </div>
        </div>
    )
}
