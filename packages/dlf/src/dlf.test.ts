import { DlfService, DataItem } from './index';

describe('DlfService', () => {
  let service: DlfService;

  beforeEach(() => {
    service = new DlfService();
  });

  afterEach(() => {
    service.clearData();
  });

  test('should initialize with sample data', () => {
    const data = service.getData();
    expect(data.length).toBeGreaterThan(0);
    expect(service.getStatus()).toBe('ready');
  });

  test('should add new data item', () => {
    const initialCount = service.getData().length;
    const newItem = service.addData({
      name: 'Test Item',
      value: 123,
      metadata: { test: true }
    });

    expect(newItem.id).toBeDefined();
    expect(newItem.name).toBe('Test Item');
    expect(service.getData().length).toBe(initialCount + 1);
  });

  test('should filter data by query', () => {
    service.addData({
      name: 'Test A',
      value: 100,
      metadata: { category: 'test' }
    });

    const filtered = service.getData({
      filters: { 'metadata.category': 'test' }
    });

    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Test A');
  });

  test('should get statistics', () => {
    const stats = service.getStats();
    expect(stats.total).toBeGreaterThan(0);
    expect(stats.averageValue).toBeGreaterThan(0);
    expect(stats.categories).toBeDefined();
  });
});