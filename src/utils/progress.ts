import type { Episode, ShowItem } from '../types/watchlist';

export const calculateShowProgress = (episodes: Episode[]): number => {
    if (!episodes || episodes.length === 0) return 0;

    const watchedCount = episodes.reduce((acc, ep) => {
        return ep.isWatched ? acc + 1 : acc;
    }, 0);

    const percentage = (watchedCount / episodes.length) * 100;
    return Math.min(100, Math.max(0, Math.round(percentage)));
}

export const calculateTotalWatchListProgress = (items: ShowItem[]): number => {
    if (!items || items.length === 0) return 0;

    const totals = items.reduce((acc, item) => {
        return {
            watched: acc.watched + item.watchedEpisodes,
            total: acc.total + item.totalEpisodes,
        };
    }, {watched: 0, total: 0}
);

if (totals.total === 0) return 0;

const percentage = (totals.watched / totals.total) * 100;
return Math.min(100, Math.max(0, Math.round(percentage)));
}