import type { Episode, MediaType, ShowItem, WatchStatus } from '../types/watchlist';

const WATCHLIST_STORAGE_KEY = 'mywatch-watchlist';

function isEpisode(value: unknown): value is Episode {
  if (!value || typeof value !== 'object') return false;

  const episode = value as Record<string, unknown>;
  return typeof episode.id === 'string'
    && typeof episode.title === 'string'
    && typeof episode.isWatched === 'boolean';
}

function isShowItem(value: unknown): value is ShowItem {
  if (!value || typeof value !== 'object') return false;

  const item = value as Record<string, unknown>;
  const mediaTypes: MediaType[] = ['movie', 'tv', 'anime'];
  const statuses: WatchStatus[] = ['plan_to_watch', 'watching', 'completed'];

  return typeof item.id === 'string'
    && typeof item.title === 'string'
    && mediaTypes.includes(item.type as MediaType)
    && statuses.includes(item.status as WatchStatus)
    && typeof item.totalEpisodes === 'number'
    && typeof item.watchedEpisodes === 'number'
    && Array.isArray(item.episodes)
    && item.episodes.every(isEpisode)
    && (item.notes === undefined || typeof item.notes === 'string')
    && typeof item.createdAt === 'number';
}

export function loadWatchlist(): ShowItem[] {
  const storedItems = localStorage.getItem(WATCHLIST_STORAGE_KEY);
  if (storedItems === null) return [];

  const parsedItems: unknown = JSON.parse(storedItems);
  if (!Array.isArray(parsedItems) || !parsedItems.every(isShowItem)) {
    throw new Error('Data watchlist yang tersimpan tidak valid.');
  }

  return parsedItems;
}

export function saveWatchlist(items: ShowItem[]): void {
  localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(items));
}