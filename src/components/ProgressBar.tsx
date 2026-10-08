import React from 'react'
import { Progress } from '../components/ui/progress';

interface ProgressBarProps {
    watched: number;
    total: number;
    percentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ watched, total, percentage}) => {
    return (
        <div className='flex flex-col gap-1.5 mt-3 w-full'>
            <div className='flex justify-between text-xs font-semibold text-zinc-400'>
                <span>Progress</span>
                <span className='text-zinc-300'>
                    {watched} / {total} ({percentage}%)
                </span>
            </div>
            <Progress value={percentage} className='h-1.5 bg-zinc-900 [&>div]:bg-red-600'/>
        </div>
    )
}