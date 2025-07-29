'use client';

import { Task } from '@/types';
import TaskItem from './TaskItem';

type Props = {
    tasks: Task[];
    focusedId: string | null;
    onFocus: (id: string) => void;
    onDelete: (id: string) => void;
    onTick: (id: string) => void;
    onPause: (id: string) => void;
    onResume: (id: string) => void;
    onComplete: (id: string) => void;
};

export default function TaskList({ 
    tasks, 
    focusedId, 
    onFocus, 
    onDelete,
    onTick,
    onPause,
    onResume,
    onComplete,
}: Props) {
    if(tasks.length === 0) {
        return <p className='text-gray-400'>No tasks yet. Add something to focus on!</p>
    }

    return (
        <div className='w-full max-w-md'>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    isFocused={task.id === focusedId}
                    onFocus={onFocus}
                    onDelete={onDelete}
                    onPause={onPause}
                    onResume={onResume}
                    onTick={onTick}
                    onComplete={onComplete}
                />
            ))}
        </div>
    )
}