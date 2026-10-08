import React from 'react';
import type { ShowItem, Episode } from '../types/watchlist';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { ProgressBar } from '../components/ProgressBar';
import { calculateShowProgress } from '../utils/progress';
import { EpisodeList } from '../components/EpisodeList';

interface ShowDetailProps {
    show: ShowItem | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdateShow: (updatedShow: ShowItem) => void;
    onDeleteShow: (id: string) => void;
}

export const ShowDetail: React.FC<ShowDetailProps> = ({ show, isOpen, onClose, onUpdateShow, onDeleteShow }) => {
    if (!show) return null;

    const progressPercentage = calculateShowProgress(show.episodes);

    const updateEpisodesData = (updatedEpisodes: Episode[]) => {
        const newWatchedCount = updatedEpisodes.filter((ep) => ep.isWatched).length;
        const newStatus = newWatchedCount === 0
            ? 'plan_to_watch'
            : newWatchedCount === updatedEpisodes.length
                ? 'completed'
                : 'watching';

        onUpdateShow({
            ...show,
            episodes: updatedEpisodes,
            totalEpisodes: updatedEpisodes.length,
            watchedEpisodes: newWatchedCount,
            status: newStatus
        });
    };

    const toggleEpisode = (episodeId: string) => {
        const updatedEpisodes = show.episodes.map((ep) =>
            ep.id === episodeId ? { ...ep, isWatched: !ep.isWatched } : ep
        );
        updateEpisodesData(updatedEpisodes);
    };

    const handleAddEpisode = (newEpisode: Episode) => {
        const updatedEpisodes = [...show.episodes, newEpisode];
        updateEpisodesData(updatedEpisodes);
    };

    const handleEditEpisode = (editedEpisode: Episode) => {
        const updatedEpisodes = show.episodes.map(ep =>
            ep.id === editedEpisode.id ? editedEpisode : ep
        );
        updateEpisodesData(updatedEpisodes);
    };

    const handleDeleteEpisode = (episodeId: string) => {
        if (window.confirm("Hapus episode ini?")) {
            const updatedEpisodes = show.episodes.filter(ep => ep.id !== episodeId);
            updateEpisodesData(updatedEpisodes);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className='bg-[#181818] border-zinc-800 text-zinc-200 sm:max-w-[600px] max-h-[85vh] overflow-y-auto'>
                <DialogHeader className='mb-2'>
                    <div className='flex gap-4 items-start'>
                        {show.poster ? (
                            <img src={show.poster} alt={show.title} className='w-24 h-36 object-cover rounded-md shadow-lg shadow-black/80 flex-shrink-0' />
                        ) : (
                            <div className='w-24 h-36 bg-zinc-800 rounded-md flex items-center justify-center text-zinc-600 text-xs text-center flex-shrink-0'>
                                No Poster
                            </div>
                        )}
                        <div className='flex flex-col gap-2 w-full pt-2'>
                            
                            <div className="flex justify-between items-start gap-4">
                                <DialogTitle className='text-2xl font-bold text-white leading-tight'>
                                    {show.title}
                                </DialogTitle>
                                <div className="flex gap-2 shrink-0">
                                    <button 
                                        onClick={() => onDeleteShow(show.id)}
                                        className="p-2 text-red-500 hover:text-white hover:bg-red-600 bg-red-950/30 rounded-md transition-colors text-sm border border-red-900/50"
                                        title="Delete Show"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-400">
                                <Badge className="bg-zinc-800 text-zinc-300 border-none rounded-sm px-2">
                                    {show.type === 'tv' ? 'TV series' : show.type === 'movie' ? 'Movie' : 'Anime'}
                                </Badge>
                                {show.year && <span>• {show.year}</span>}
                                {show.genre && <span>• {show.genre}</span>}
                            </div>
                            
                            <ProgressBar
                                watched={show.watchedEpisodes}
                                total={show.totalEpisodes}
                                percentage={progressPercentage}
                            />
                        </div>
                    </div>
                </DialogHeader>
                
                <EpisodeList
                    episodes={show.episodes}
                    onToggleWatched={toggleEpisode}
                    onAddEpisode={handleAddEpisode}
                    onEditEpisode={handleEditEpisode}
                    onDeleteEpisode={handleDeleteEpisode}
                />
            </DialogContent>
        </Dialog>
    )
};