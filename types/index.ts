export type Task = {
    id: string;
    title: string;
    isFocused: boolean;
    remaining: number;
    isRunning: boolean;
    isCompleted?: boolean;
};