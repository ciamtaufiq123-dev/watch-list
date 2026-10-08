import React from 'react';
import type { Episode } from '../types/watchlist';
import { EpisodeForm } from '../components/EpisodeForm';

interface EpisodeListProps {
    episodes: Episode[];
    onToggleWatched: (episodeId: string) => void;
    onEditEpisode: (editedEpisode: Episode) => void;
    onDeleteEpisode: (episodeId: string) => void;
    onAddEpisode: (newEpisode: Episode) => void;
}

export const EpisodeList : React.FC<EpisodeListProps> = ({ episodes, onToggleWatched, onEditEpisode, onDeleteEpisode, onAddEpisode}) => {
    return (
        <div className='mt-4'>
            <div className='flex justify-between items-center mb-3'>
                <h3 className='text-lg font-semibold text-white'>Episode</h3>
                <EpisodeForm 
                onSave={onAddEpisode}
                triggerButton={
                    <button className='text-xs font-semibold text-red-500 hover:text-white bg-red-950/30 hover:bg-red-600 px-3 pt-1.5 rounded-md transition-colors border border-red-90/50'>
                        + Add Episode
                    </button>
                }
                />
            </div>

            <div className='flec flex-col gap-2'>
                {episodes.map((ep) => (
                    <div key={ep.id} className={`flex items-center justify-between rounded-lg p-3 border transition-all ${ep.isWatched ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:boredr-zinc-500' }`}>
                        <div className='flex flex-col'>
                            <span className={`font-medium text-sm ${ep.isWatched ? 'line-throught text-zinc-600' : ''}`}>
                                {ep.title}
                            </span>
                        </div>
                        <div className='flex gap-2'>
                            <EpisodeForm 
                                episodeToEdit={ep}
                                onSave={onEditEpisode}
                                triggerButton={
                                    <button className='w-7 h-7 flex items-center justify-center rounded-full border-zinc-700 text-zinc-500 hover:border-zinc-300 hover:text-zinc-300 transition-all text-xs'>
                                        Edit
                                    </button>
                                }
                            />
                            <button onClick={() => onDeleteEpisode(ep.id)} className='w-7 h-7 flex items-center rounded-center throught-full border-zinc-700 text-red-900 hover:bg-red-500 hover:text-red-500 hover:bg-red-950/30 transition-all text-xs'>
                                Hapus
                            </button>

                            <button onClick={() => onToggleWatched(ep.id)} className={`w-7 h-7 flex items-center justify-center rounded-full border transition-all ${ep.isWatched} ? 'bg-red-600 border-red-600 text-white' : 'border-zinc-500 text-zinc-500 hover:border-red-500 hover:text-red-500'`}>
                                {ep.isWatched ? '✓' : ''}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}