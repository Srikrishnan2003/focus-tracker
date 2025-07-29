'use client'

import { useState } from "react"
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
    onAdd: (title: string) => void;
};

export default function TaskInput({ onAdd }: Props ) {
    const [title, setTitle] = useState('');

    const handleSubmit = () => {
        if(title.trim()) {
            onAdd(title);
            setTitle('');
        }
    }

    return(
        <div className="flex space-x-2 mb-6">
            <Input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your tasks..."
                className="w-64"
            />
            <Button onClick={handleSubmit}>
                Add
            </Button>
        </div>
    )
}