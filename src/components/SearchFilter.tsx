import React from 'react';
import { Input } from '../components/ui/input';

interface searchFilterProps {
    searchQuery: string
    onSearchChange: (query: string) => void;
}
export const SearchFilter: React.FC<searchFilterProps> = ({searchQuery, onSearchChange}) => {
return (
<Input
    placeholder="Search titles..."
    className="w-full border-zinc-800 bg-zinc-900/80 text-white placeholder:text-zinc-500 focus-visible:border-red-600 focus-visible:ring-red-600 sm:w-64"
    value={searchQuery}
    onChange={(e) => onSearchChange(e.target.value)}
    />
);
};