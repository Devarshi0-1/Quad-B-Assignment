import { useAppSelector } from '@/redux/hooks'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import 'react-circular-progressbar/dist/styles.css'
import Task from './Task'

export default function TasksList() {
    const [animationParent] = useAutoAnimate()
    const tasks = useAppSelector((state) => state.tasksSlice.tasks)

    return (
        <div className='flex min-h-[300px] flex-col gap-3 overflow-y-auto' ref={animationParent}>
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    )
}
