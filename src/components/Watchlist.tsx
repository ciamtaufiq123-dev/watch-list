import React from 'react';
import type { ShowItem } from '../types/watchlist'
import { ShowCard } from '../components/ShowCard';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '../components/ui/select';

interface WatchlistProps {
    filteredItems: ShowItem[]
    totalOriginalItems: number;
    onSelectShow: (Show: ShowItem) => void;
    filterStatus: string;
    onFilterChange: (status: string) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
}

export const Watchlist: React.FC<WatchlistProps> = ({
    filteredItems,
    totalOriginalItems,
    onSelectShow,
    filterStatus,
    onFilterChange,
    sortBy,
    onSortChange
}) => {
    const tabs = [
    { id: 'all', label: 'All Shows' },
    { id: 'watching', label: 'Watching' },
    { id: 'plan_to_watch', label: 'Plan to Watch' },
    { id: 'completed', label: 'Completed' },
    ];

    return (
      <main className="mx-auto max-w-7xl p-6 md:p-12">
        <h2 className="mb-4 text-xl font-medium text-zinc-300">My List</h2>
    
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-zinc-800 pb-0">
          
          <div className="flex gap-6 w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onFilterChange(tab.id)}
                className={`pb-3 px-1 text-sm font-medium transition-colors whitespace-nowrap -mb-[1px] ${
                  filterStatus === tab.id
                    ? 'text-red-500 border-b-2 border-red-500' 
                    : 'text-zinc-500 hover:text-zinc-300 border-b-2 border-transparent' 
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        
          <div className="flex items-center gap-2 pb-3 w-full sm:w-auto justify-end">
            <label className="text-xs font-medium text-zinc-500">Sort by:</label>
            
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-auto bg-transparent border-none text-sm font-medium text-zinc-300 focus:ring-0 shadow-none h-auto p-0 justify-end gap-2 hover:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                position="popper"
                side="bottom"
                avoidCollisions={false}
                className="bg-[#181818] border-zinc-800 text-zinc-200 hover:text-white"
              >
                <SelectItem value="newest" className="data-[highlighted]:bg-zinc-800 data-[highlighted]:!text-white data-[highlighted]:**:!text-white cursor-pointer">Newest Added</SelectItem>
                <SelectItem value="a-z" className="data-[highlighted]:bg-zinc-800 data-[highlighted]:!text-white data-[highlighted]:**:!text-white cursor-pointer">Title (A-Z)</SelectItem>
                <SelectItem value="progress" className="data-[highlighted]:bg-zinc-800 data-[highlighted]:!text-white data-[highlighted]:**:!text-white cursor-pointer">Highest Progress</SelectItem>
              </SelectContent>
            </Select>

          </div>
        
        </div>

        {filteredItems.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-950/50 py-20 text-center text-zinc-600">
            {totalOriginalItems === 0
              ? 'Daftar tontonan kosong. Klik "+ Add New" untuk mulai menambahkan.'
              : 'Tidak ada tontonan di kategori ini atau yang cocok dengan pencarian.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <ShowCard
                key={item.id}
                show={item}
                onClick={() => onSelectShow(item)}
              />
            ))}
          </div>
        )}
      </main>
    );
};