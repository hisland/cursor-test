import request from 'supertest';
import app from './index';

describe('Portal API', () => {
  test('GET /health should return service status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body.status).toBe('ok');
    expect(response.body.services.dlf).toBe('ready');
    expect(response.body.services.acrsa).toBe('ready');
  });

  test('GET /api/dlf/data should return DLF data', async () => {
    const response = await request(app)
      .get('/api/dlf/data')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('GET /api/acrsa/analyze should analyze text', async () => {
    const response = await request(app)
      .get('/api/acrsa/analyze?input=测试文本')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.result).toBeDefined();
  });

  test('GET /api/combined should return combined results', async () => {
    const response = await request(app)
      .get('/api/combined')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.combined.dlf).toBeDefined();
    expect(response.body.combined.acrsa).toBeDefined();
  });
});