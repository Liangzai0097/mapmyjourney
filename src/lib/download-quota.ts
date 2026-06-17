/**
 * 免费版下载次数限制
 * 策略：免费用户每天可下载 1 次，付费用户无限
 * 用 localStorage 按自然日计数
 */

const FREE_DAILY_LIMIT = 1;
const STORAGE_KEY = 'mapmyjourney_download_quota';

interface QuotaState {
  date: string; // YYYY-MM-DD
  count: number;
}

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function getQuota(): QuotaState {
  if (typeof window === 'undefined') return { date: getTodayStr(), count: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: getTodayStr(), count: 0 };
    const parsed = JSON.parse(raw) as QuotaState;
    // 如果日期不是今天，重置计数
    if (parsed.date !== getTodayStr()) {
      return { date: getTodayStr(), count: 0 };
    }
    return parsed;
  } catch {
    return { date: getTodayStr(), count: 0 };
  }
}

function saveQuota(state: QuotaState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage 不可用时静默失败，不影响核心功能
  }
}

/**
 * 检查免费用户是否还能下载
 */
export function canDownload(hasPaid: boolean): boolean {
  if (hasPaid) return true;
  const quota = getQuota();
  return quota.count < FREE_DAILY_LIMIT;
}

/**
 * 获取今日剩余下载次数
 */
export function getRemainingDownloads(hasPaid: boolean): number {
  if (hasPaid) return Infinity;
  const quota = getQuota();
  return Math.max(0, FREE_DAILY_LIMIT - quota.count);
}

/**
 * 记录一次下载（在下载成功后调用）
 */
export function recordDownload(hasPaid: boolean) {
  if (hasPaid) return;
  const quota = getQuota();
  saveQuota({ date: getTodayStr(), count: quota.count + 1 });
}

export { FREE_DAILY_LIMIT };
