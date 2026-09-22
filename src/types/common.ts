// src/types/common.ts
export type BadgeVariant = 'top10' | 'episode_baru' | 'premium';

export interface ContentBadge {
  variant: BadgeVariant;
  label: string;   // "Top 10", "Episode Baru", dst — biar fleksibel kalau mau custom teks
}