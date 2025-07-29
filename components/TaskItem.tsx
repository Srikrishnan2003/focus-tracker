'use client';

import { Task } from "@/types";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import PomodoroTimer from "./PomodoroTimer";
import { cn } from "@/lib/utils";

type Props = {
    task: Task;
    isFocused: boolean;
    onFocus: (id: string) => void;
    onDelete: (id: string) => void;
    onTick: (id: string) => void;
    onPause: (id: string) => void;
    onResume: (id: string) => void;
    onComplete: (id: string) => void;
};

export default function TaskItem({ 
    task, 
    isFocused, 
    onFocus, 
    onDelete,
    onTick,
    onPause,
    onResume,
    onComplete, 
}: Props) {
    return(
        <Card className="mb-4">
            <CardContent className="flex justify-between items-center py-4">
                <span className={cn(
                    "text-lg font-semibold",
                    task.isCompleted && 'text-red-600',
                    !task.isCompleted && isFocused && "text-green-600"
                )}>
                    {task.title}
                </span>

                <div className="flex gap-2">
                    {!task.isCompleted && (
                       <Button
                        variant={isFocused ? 'secondary' : 'default'}
                        onClick={() => onFocus(task.id)}
                    >   
                        {isFocused ? 'Unfocus' : 'Focus'}
                    </Button> 
                    )}
                    
                    <Button 
                        variant="destructive"
                        onClick={() => onDelete(task.id)}    
                    >
                        Delete
                    </Button>
                </div>
                    <div className={isFocused && !task.isCompleted ? "mt-1 block" : "hidden"}>
                       <PomodoroTimer
                        secondsLeft={task.remaining}
                        isRunning={task.isRunning}
                        onTick={() => onTick(task.id)}
                        onPause={() => onPause(task.id)}
                        onResume={() => onResume(task.id)}
                        onComplete={() => onComplete(task.id)}
                    /> 
                    </div>
            </CardContent>
        </Card>
    );
}