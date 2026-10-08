import React, { useState } from 'react';
import type { Episode } from '../types/watchlist';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface EpisodeFormProps {
    episodeToEdit?: Episode;
    onSave: (episode: Episode) => void;
    triggerButton: React.ReactNode;
}

export const EpisodeForm: React.FC<EpisodeFormProps> = ({ episodeToEdit, onSave, triggerButton }) => {
    const [open, setOpen] = useState(false);

    const [episodeNumber, setEpisodeNumber] = useState(episodeToEdit?.episodeNumber?.toString() || '');
    const [title, setTitle] = useState(episodeToEdit?.title || '');
    const [videoLink, setVideoLink] = useState(episodeToEdit?.videoLink || '');
    const [notes, setNotes] = useState(episodeToEdit?.notes || '');
    const [isWatched, setIsWatched] = useState(episodeToEdit?.isWatched || false);


const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!episodeNumber) return;

    const savedEpisode: Episode = {
        id: episodeToEdit?.id || crypto.randomUUID(),
        episodeNumber: parseInt(episodeNumber),
        title: title.trim(),
        videoLink: videoLink.trim(),
        notes: notes.trim(),
        isWatched,
    };

    onSave(savedEpisode);
    
    if (!episodeToEdit) {
        setEpisodeNumber('');
        setTitle('');
        setVideoLink('');
        setNotes('');
        setIsWatched(false);
    };

    setOpen(false);
};

return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {triggerButton}
        </DialogTrigger>

        <DialogContent className='bg-[#181818] border-zinz-800 text-zinc-200 sm:max-w-[425px]'>
            <DialogHeader>
                <DialogTitle className='text-xl font-bold text-white uppercase tracking-wider'>
                    {episodeToEdit ? 'Edit episode' : 'Add Episode'}
                </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className='felx flex-col gap-4 mt-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm text-zinc-400 font-medium'>Ep Number <span className='text-red-500'>*</span></label>
                        <Input type='number' min='1' value={episodeNumber} className='bg-zinc-900 boredr-zinc-800 focus-visible:ring-red-600 text-white' onChange={(e) => setEpisodeNumber(e.target.value)} required/>
                    </div>
                </div>

                <div className='flex flex-col gap-1.5'>
                    <label className='text-sm text-zinc-400 font-medium'>Title</label>
                    <Input className='bg-zinc-900 border-zinc-800 focus-visible:ring-red-600 text-white' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className='flex flex-col gap-1.5'>
                    <label className='text-sm text-zinc-400 font-medium'>Video Link</label>
                    <Input className='bg-zinc-900 border-zinc-800 focus-visible:ring-red-600 text-white' type='url' placeholder='https://...' value={videoLink} onChange={(e) => setVideoLink(e.target.value)}/>
                </div>

                <div className='flex flex-col gap-1.5'>
                    <label className='text-sm text-zinc-400 font-medium'>Notes (opsional)</label>
                    <Input className='bg-zinc-800 border-zinc-800 focus-visibile:ring-red-600 text-white' value={notes} onChange={(e) => setNotes(e.target.value)}/>
                </div>

                {episodeToEdit && (
                    <div className=''>
                        <input 
                            type='checkbox'
                            className='w-4 h-4 accent-red-600'
                            id='watched'
                            checked={isWatched}
                            onChange={(e) => setIsWatched(e.target.checked)}
                        />
                        <label className='text-sm text-zinc-300' htmlFor='watched'>Mark as Watched</label>
                    </div>
                )}

                <div className=''>
                    <Button type='button' variant='ghost' onClick={() => setOpen(false)} className='hover:bg-zinc-800 hover:text-white text-zinc-400'>
                        cancel
                    </Button>
                    <Button>
                        {episodeToEdit? 'Save Changes' : 'Add Episodes'}
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
);
};