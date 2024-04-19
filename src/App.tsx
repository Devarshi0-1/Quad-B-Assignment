import NavBar from '@/components/Navbar'
import TasksContainer from '@/components/TasksContainer'

const App = () => {
    return (
        <div className='flex h-screen w-full items-center justify-center'>
            <NavBar />
            <TasksContainer />
        </div>
    )
}

export default App
