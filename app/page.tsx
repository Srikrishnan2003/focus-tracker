'use client'

import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import { Task } from "@/types";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const handleAdd = (title: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      isFocused: false,
      remaining: 0.1 * 60,
      isRunning: false
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleFocus = (id: string) => {
    setFocusedId((prev) => (prev === id ? null : id));
    setTasks(prev =>
      prev.map(task => ({
        ...task,
        isRunning: task.id === id ? true : false
      }))
    );
    if(focusedId === id) {
      setFocusedId(null);
      setTasks(prev => prev.map(t => ({ ...t, isRunning: false })));
    }
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if(focusedId === id) {
      setFocusedId(null);
    }
  };

  const handleTick = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id 
          ? {...task, remaining: Math.max(0, task.remaining - 1)}
          : task
      )
    );
  };

  const handlePause = (id: string) => {
    setTasks(prev => 
      prev.map(task =>
        task.id === id ? {...task, isRunning: false} : task
      )
    );
  };

  const handleResume = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? {...task, isRunning: true} : task
      )
    );
  };

  const handleComplete = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
            ...task,
            isFocused: false,
            isRunning: false,
            isCompleted: true,
            remaining: 0
          }
          : task
      )
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-20 px-4 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">🎯 Focus Task Tracker</h1>
      <TaskInput onAdd={handleAdd}/>
      <TaskList
        tasks={tasks}
        focusedId={focusedId}
        onFocus={handleFocus}
        onDelete={handleDelete}
        onPause={handlePause}
        onResume={handleResume}
        onTick={handleTick}
        onComplete={handleComplete}
      />
    </main>
  )
}