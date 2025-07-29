'use client';

import { useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
    secondsLeft: number;
    isRunning: boolean;
    onTick: () => void;
    onPause: () => void;
    onResume: () => void;
    onComplete?: () => void;
};

export default function PomodoroTimer({
    secondsLeft,
    isRunning,
    onTick,
    onPause,
    onResume,
    onComplete
}: Props) {
    useEffect(() => {
        if(!isRunning) return;

        const interval = setInterval(onTick, 1000);
        return () => clearInterval(interval);
    }, [isRunning, onTick]);

    useEffect(() => {
        if(secondsLeft === 0 && isRunning) {
            onComplete?.();
        }
    }, [secondsLeft, isRunning]);

    const formatTime = (s: number) => {
        const min = Math.floor(s/60)
            .toString()
            .padStart(2, '0');
        const sec = (s % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    return (
        <Card className="w-full max-w-sm mt-4">
            <CardHeader>
                <CardTitle className="text-center">Pomodoro</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <div className="text-4xl font-mono mb-4">{formatTime(secondsLeft)}</div>
                <Button onClick={isRunning ? onPause : onResume} variant="default">
                    {isRunning ? 'Pause' : 'Resume'}
                </Button>
            </CardContent>
        </Card>
    )
}