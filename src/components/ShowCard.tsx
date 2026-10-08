import React from 'react';
import type { ShowItem } from '../types/watchlist';
import { calculateShowProgress } from '../utils/progress';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface ShowCardProps {
  show: ShowItem;
  onClick: (show: ShowItem) => void;
}

export const ShowCard: React.FC<ShowCardProps> = ({ show, onClick }) => {
  const progressPercentage = calculateShowProgress(show.episodes);

  return (
    <Card
      className="bg-[#181818] border-zinc-800/50 text-zinc-200 cursor-pointer hover:border-zinc-700 hover:scale-[1.02] transition-all duration-300 group"
      onClick={() => onClick(show)}
    >
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-white leading-tight group-hover:text-red-500 transition-colors line-clamp-2">
              {show.title}
            </h3>
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
              <Badge
                variant="secondary"
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-none rounded-sm px-2 py-0.5"
              >
                {show.type === 'tv'
                  ? 'TV Series'
                  : show.type === 'movie'
                    ? 'Movie'
                    : 'Anime'}
              </Badge>
              <span>•</span>
              <span>{show.totalEpisodes} Eps</span>
            </div>
          </div>

          <button className="text-zinc-600 hover:text-white transition-colors px-1">
            &#8942;
          </button>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-end text-xs font-bold text-zinc-500">
            {progressPercentage}%
          </div>
          <Progress
            value={progressPercentage}
            className="h-1.5 bg-zinc-900 [&>div]:bg-red-600"
          />
        </div>
      </CardContent>
    </Card>
  );
};