export interface SiteConfig {
  title: string;
  favicon: string;
  description?: string;
  author?: string;
  keywords?: string;
  ogimage?: string;
}

export interface NavConfig {}

// 环形列表
export class CircularList<T> {
  private items: T[];
  private currentIndex: number;

  constructor(elements: T[]) {
    if (elements.length === 0) {
      throw new Error("At least one element must be provided");
    }
    this.items = elements; // 存储所有元素
    this.currentIndex = 0; // 初始化当前索引
  }

  // 获取当前元素
  getCurrent(): T {
    return this.items[this.currentIndex];
  }

  // 移动到下一个元素
  next(): T {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    return this.getCurrent();
  }
}