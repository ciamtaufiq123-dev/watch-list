import { useEffect, useState } from 'react';
import type { ShowItem } from './types/watchlist';
import { loadWatchlist, saveWatchlist } from './utils/storage';
import { ShowForm } from './components/ShowForm';
import { SearchFilter } from '../src/components/SearchFilter'
import { ShowDetail } from '../src/components/ShowDetail';
import { Watchlist } from '../src/components/Watchlist';

export default function App() {
  const [items, setItems] = useState<ShowItem[]>(() => loadWatchlist());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShow, setSelectedShow] = useState<ShowItem | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const handleUpdateShow = (updatedShow: ShowItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedShow.id ? updatedShow : item))
    );
    setSelectedShow(updatedShow);
  };
  
  const handleDeleteShow = (id: string) => {
    if (window.confirm("Apakah kamu yakin ingin menghapus judul ini dari watchlist?")) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setSelectedShow(null);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus = filterStatus === 'all' || item.status  === filterStatus;

    return matchSearch && matchStatus;
  });

  useEffect(() => {
    saveWatchlist(items);
    }, [items]);

  const handleAddShow = (newShow: ShowItem) => {
    setItems((previousItems) => [newShow, ...previousItems]);
  };

  return (
    <div className="min-h-screen bg-[#141414] font-sans text-gray-100 selection:bg-red-600/30">
      <header className="sticky top-0 z-10 flex flex-col items-center justify-between gap-4 border-b border-zinc-900 bg-black/80 px-6 py-4 backdrop-blur-md sm:flex-row md:px-12">
        <h1 className="text-3xl font-black tracking-wider text-red-600">
          MyNetflix
        </h1>

        <div className="flex w-full gap-3 sm:w-auto">
          <SearchFilter
            searchQuery={searchQuery} onSearchChange={setSearchQuery}
          />
          <ShowForm onAdd={handleAddShow} />
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6 md:p-12">

        <Watchlist
          filteredItems={filteredItems}
          totalOriginalItems={items.length}
          onSelectShow={setSelectedShow}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <ShowDetail
          show={selectedShow}
          isOpen={!!selectedShow}
          onClose={() => setSelectedShow(null)}
          onUpdateShow={handleUpdateShow}
          onDeleteShow={handleDeleteShow}
        />
      </main>
    </div>
  );
}