export type WatchStatus = 'plan_to_watch'| 'watching' | 'completed';
export type MediaType = 'movie' | 'tv' | 'anime';

export interface Episode {
    id: string;
    episodeNumber?: number;
    title: string;
    videoLink?: string;
    notes?: string;
    isWatched: boolean;
}

export interface ShowItem {
    id: string;
    title: string;
    type: MediaType;
    status: WatchStatus;
    poster?: string;
    year?: number;
    genre?: string;
    description?: string;
    totalEpisodes: number;
    watchedEpisodes: number;
    episodes: Episode[];
    notes?: string;
    createdAt: number;
}