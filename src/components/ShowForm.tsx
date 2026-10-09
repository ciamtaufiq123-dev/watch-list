import { useState } from 'react';
import { type ShowItem, type MediaType } from '../types/watchlist';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '../components/ui/select';

interface ShowFormProps {
  onAdd:(show:ShowItem) => void;
}

export const ShowForm: React.FC<ShowFormProps> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<MediaType>('series' as MediaType);
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [poster, setPoster] = useState('');
  const [totalEpisodes, setTotalEpisodes] = useState('12');
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;

    if(file.size > 2 * 1024 * 1024) {
      alert('Ukuran Terlalu Besar. Maksimal 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPoster(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!title.trim || !totalEpisodes) return;
  

  const epsCount = parseInt (totalEpisodes);
  
  const generatedEpisodes = Array.from({ length: epsCount }, (_, i) => ({
    id: crypto.randomUUID(),
    episodeNumber: i + 1,
    title: `Episode ${i + 1}`,
    isWatched: false,
  }));

  const newshow: ShowItem = {
    id: crypto.randomUUID(),
    title: title.trim(),
    type,
    status: 'plan_to_watch',
    poster: poster.trim(),
    videoLink: videoLink.trim() || undefined,
    year: year ? parseInt(year) : undefined,
    genre: genre.trim(),
    totalEpisodes: epsCount,
    watchedEpisodes: 0,
    episodes: generatedEpisodes,
    createdAt: Date.now(),
  };

  onAdd(newshow);
  setTitle('');
  setYear('');
  setGenre('');
  setVideoLink('');
  setPoster('');
  setTotalEpisodes('12');
  setOpen(false);
};

return (
  <>
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button className='bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg shadow-red-900/20'>
        + Add new
      </Button>
    </DialogTrigger>

  <DialogContent className='bg-[#141414] border-zinc-800 text-zinc-200 sm:max-w-[425px]'>
    <DialogHeader>
      <DialogTitle className='text-xl font-bold text-white uppercase tracking-wider'>
        Add New Watchlist
      </DialogTitle>
    </DialogHeader>

  <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
    <div className='flex flex-col gap-1.5'>
        <label className='text-sm font-medium text-zinc-400'>Title<span className='text-red-500'>*</span></label>
        <input placeholder='Strangers Things' className='bg-zinc-900/50 boredr-zinc-800 focus-visible:ring-red-600 text-white' value={title} onChange={(e) => setTitle(e.target.value)}
        required/>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-400">Type <span className="text-red-500">*</span></label>
          <Select value={type} onValueChange={(val) => setType(val as MediaType)}>
            <SelectTrigger className="bg-zinc-900/50 border-zinc-800 text-white focus:ring-red-600">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-[#181818] border-zinc-800 text-white">
              <SelectItem value="series">TV Series</SelectItem>
              <SelectItem value="movie">Movie</SelectItem>
              <SelectItem value="anime">Anime</SelectItem>
            </SelectContent>
          </Select>
          </div>
      </div>

      <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-400">Total Eps <span className="text-red-500">*</span></label>
              <Input 
                type="number" 
                min="1"
                className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-red-600 text-white"
                value={totalEpisodes}
                onChange={(e) => setTotalEpisodes(e.target.value)}
                required
              />
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-400">Year</label>
              <Input 
                type="number" 
                placeholder="2024"
                className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-red-600 text-white"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
          </div>
      </div>

      <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-400">Genre</label>
            <Input 
              placeholder="Action, Sci-Fi..."
              className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-red-600 text-white"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-400">Link YouTube</label>
        <Input
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-red-600 text-white"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
      </div>

      <div className=''>
        <label>Upload Gambar</label>
        <input type='file' accept='image/*' className='bg-zinc-900/50 text-zinc-400 file:bg-zinz-800 file:text-zinc-200 file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 hover:file:bg-zinc-700 cursor-pointer' onChange={handleImageUpload} />
        {poster && (
          <div className="mt-2 relative w-16 h-24 rounded overflow-hidden border border-zinc-700">
            <img src={poster} alt="Poster preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="hover:bg-zinc-800 hover:text-white text-zinc-400">
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6">
              Save to Watchlist
            </Button>
          </div>
      </form>
    </DialogContent>
  </Dialog>
  </>
)}