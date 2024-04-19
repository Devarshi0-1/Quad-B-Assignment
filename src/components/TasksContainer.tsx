import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addTask } from '@/redux/todos/tasksSlice'
import { Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import TasksList from './TasksList'

export default function TasksContainer() {
    const [addTaskText, setAddTaskText] = useState<string>('')
    const addTaskRef = useRef<HTMLInputElement>(null)

    const dispatch = useAppDispatch()
    const tasks = useAppSelector((state) => state.tasksSlice)

    const percentage: number =
        tasks.totalNumberOfTasks && (tasks.completedTasks / tasks.totalNumberOfTasks) * 100

    const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const id = Date.now().toString()
        dispatch(addTask({ id, task: addTaskText, isCompleted: false }))
        setAddTaskText('')
    }

    useEffect(() => {
        addTaskRef?.current?.focus()
    }, [])

    return (
        <main className='flex max-h-[450px] w-full flex-col gap-5 px-2 md:w-[600px]'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-semibold'>Todo App</h1>
                <div className='w-16'>
                    <CircularProgressbar
                        value={percentage}
                        strokeWidth={2}
                        styles={buildStyles({
                            textSize: '1.8rem',
                            pathColor: `hsl(var(--foreground))`,
                            textColor: 'hsl(var(--foreground))',
                            trailColor: 'hsl(var(--background))',
                            backgroundColor: 'hsl(var(--foreground))',
                        })}
                        text={`${tasks.completedTasks} / ${tasks.totalNumberOfTasks}`}
                    />
                </div>
            </div>
            <form onSubmit={handleAddTask} className='relative flex w-full rounded bg-muted'>
                <Input
                    type='text'
                    placeholder='Add a Task...'
                    className='w-full border-none pr-28'
                    value={addTaskText}
                    ref={addTaskRef}
                    onChange={(e) => setAddTaskText(e.target.value)}
                />
                <Button variant='outline' className='absolute right-0 rounded-full'>
                    <Plus />
                </Button>
            </form>
            <TasksList />
        </main>
    )
}
