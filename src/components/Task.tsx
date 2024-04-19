import { useAppDispatch } from '@/redux/hooks'
import { TTask, deleteTask, editTask, toggleTaskStatus } from '@/redux/todos/tasksSlice'
import { useState } from 'react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'

type TTaskProp = {
    task: TTask
}

export default function Task({ task }: TTaskProp) {
    const [activeEdit, setActiveEdit] = useState<boolean>(false)
    const [editTaskText, setEditTaskText] = useState<string>(task.task)
    const dispatch = useAppDispatch()

    return (
        <div className='flex w-full items-center justify-between rounded-md bg-muted px-2 py-2'>
            <div className='flex w-full items-center gap-3'>
                <Checkbox
                    checked={task.isCompleted}
                    onClick={() => dispatch(toggleTaskStatus(task.id))}
                />
                <Input
                    type='text'
                    value={editTaskText}
                    className='w-3/4'
                    onChange={(e) => setEditTaskText(e.target.value)}
                    readOnly={!activeEdit}
                />
            </div>
            <div className='flex items-center gap-3'>
                {activeEdit ? (
                    <Button
                        size='sm'
                        variant='default'
                        onClick={() => {
                            setActiveEdit(false)
                            dispatch(editTask({ id: task.id, task: editTaskText }))
                        }}>
                        Save
                    </Button>
                ) : (
                    <Button size='sm' variant='outline' onClick={() => setActiveEdit(true)}>
                        Edit
                    </Button>
                )}

                <Button
                    size='sm'
                    variant='destructive'
                    onClick={() => dispatch(deleteTask(task.id))}>
                    Delete
                </Button>
            </div>
        </div>
    )
}
