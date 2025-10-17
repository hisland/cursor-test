import _ from 'lodash';

export interface DataItem {
  id: string;
  name: string;
  value: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface DataQuery {
  filters?: Record<string, any>;
  sort?: string;
  limit?: number;
  offset?: number;
}

export class DlfService {
  private data: DataItem[] = [];
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    // 模拟初始化数据
    this.data = [
      {
        id: '1',
        name: 'Sample Data 1',
        value: 100,
        timestamp: new Date(),
        metadata: { category: 'A', priority: 'high' }
      },
      {
        id: '2',
        name: 'Sample Data 2',
        value: 250,
        timestamp: new Date(Date.now() - 3600000), // 1小时前
        metadata: { category: 'B', priority: 'medium' }
      },
      {
        id: '3',
        name: 'Sample Data 3',
        value: 75,
        timestamp: new Date(Date.now() - 7200000), // 2小时前
        metadata: { category: 'A', priority: 'low' }
      }
    ];
    this.isInitialized = true;
  }

  /**
   * 获取所有数据或根据查询条件过滤数据
   */
  public getData(query?: DataQuery): DataItem[] {
    let result = [...this.data];

    if (query?.filters) {
      result = result.filter(item => {
        return Object.entries(query.filters!).every(([key, value]) => {
          if (key.includes('.')) {
            // 支持嵌套属性查询，如 'metadata.category'
            return _.get(item, key) === value;
          }
          return (item as any)[key] === value;
        });
      });
    }

    if (query?.sort) {
      result = _.orderBy(result, [query.sort], ['asc']);
    }

    if (query?.offset) {
      result = result.slice(query.offset);
    }

    if (query?.limit) {
      result = result.slice(0, query.limit);
    }

    return result;
  }

  /**
   * 根据ID获取单个数据项
   */
  public getById(id: string): DataItem | undefined {
    return this.data.find(item => item.id === id);
  }

  /**
   * 添加新数据项
   */
  public addData(item: Omit<DataItem, 'id' | 'timestamp'>): DataItem {
    const newItem: DataItem = {
      ...item,
      id: this.generateId(),
      timestamp: new Date()
    };
    this.data.push(newItem);
    return newItem;
  }

  /**
   * 更新数据项
   */
  public updateData(id: string, updates: Partial<Omit<DataItem, 'id'>>): DataItem | null {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      return null;
    }

    this.data[index] = {
      ...this.data[index],
      ...updates,
      id // 确保ID不被覆盖
    };

    return this.data[index];
  }

  /**
   * 删除数据项
   */
  public deleteData(id: string): boolean {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) {
      return false;
    }

    this.data.splice(index, 1);
    return true;
  }

  /**
   * 获取数据统计信息
   */
  public getStats(): {
    total: number;
    averageValue: number;
    categories: Record<string, number>;
    recentCount: number;
  } {
    const total = this.data.length;
    const averageValue = total > 0 ? _.meanBy(this.data, 'value') : 0;
    
    const categories = _.countBy(this.data, item => item.metadata?.category || 'unknown');
    
    const oneHourAgo = new Date(Date.now() - 3600000);
    const recentCount = this.data.filter(item => item.timestamp > oneHourAgo).length;

    return {
      total,
      averageValue: Math.round(averageValue * 100) / 100,
      categories,
      recentCount
    };
  }

  /**
   * 获取服务状态
   */
  public getStatus(): string {
    return this.isInitialized ? 'ready' : 'initializing';
  }

  /**
   * 清空所有数据
   */
  public clearData(): void {
    this.data = [];
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// 导出类型和默认实例
export default DlfService;