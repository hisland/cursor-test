import { AcrsaService } from './index';

describe('AcrsaService', () => {
  let service: AcrsaService;

  beforeEach(() => {
    service = new AcrsaService();
  });

  test('should initialize successfully', () => {
    expect(service.getStatus()).toBe('ready');
  });

  test('should analyze positive sentiment', () => {
    const result = service.analyze('这个产品很好，我很喜欢！');
    
    expect(result.sentiment.label).toBe('positive');
    expect(result.sentiment.score).toBeGreaterThan(0);
    expect(result.keywords.length).toBeGreaterThan(0);
    expect(result.summary.wordCount).toBeGreaterThan(0);
  });

  test('should analyze negative sentiment', () => {
    const result = service.analyze('这个产品很差，我很讨厌！');
    
    expect(result.sentiment.label).toBe('negative');
    expect(result.sentiment.score).toBeLessThan(0);
  });

  test('should extract entities', () => {
    const result = service.analyze('联系我：test@example.com 或访问 https://example.com');
    
    const emailEntity = result.entities.find(e => e.type === 'EMAIL');
    const urlEntity = result.entities.find(e => e.type === 'URL');
    
    expect(emailEntity).toBeDefined();
    expect(urlEntity).toBeDefined();
  });

  test('should compare text similarity', () => {
    const similarity = service.compareSimilarity(
      '这是一个测试文本',
      '这是另一个测试文本'
    );
    
    expect(similarity.similarity).toBeGreaterThan(0);
    expect(similarity.similarity).toBeLessThanOrEqual(1);
  });

  test('should handle empty text', () => {
    expect(() => service.analyze('')).toThrow('输入文本不能为空');
  });
});