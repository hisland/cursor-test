import express from 'express';
import { DlfService } from '@monorepo/dlf';
import { AcrsaService } from '@monorepo/acrsa';

const app = express();
const port = process.env.PORT || 3000;

// 初始化服务
const dlfService = new DlfService();
const acrsaService = new AcrsaService();

app.use(express.json());

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    services: {
      dlf: dlfService.getStatus(),
      acrsa: acrsaService.getStatus()
    }
  });
});

// DLF 服务端点
app.get('/api/dlf/data', (req, res) => {
  try {
    const data = dlfService.getData();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ACRSA 服务端点
app.get('/api/acrsa/analyze', (req, res) => {
  try {
    const result = acrsaService.analyze(req.query.input as string);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 组合服务端点
app.get('/api/combined', (req, res) => {
  try {
    const dlfData = dlfService.getData();
    const acrsaResult = acrsaService.analyze(JSON.stringify(dlfData));
    
    res.json({
      success: true,
      combined: {
        dlf: dlfData,
        acrsa: acrsaResult,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Portal application running on port ${port}`);
  console.log(`📊 DLF Service: ${dlfService.getStatus()}`);
  console.log(`🔍 ACRSA Service: ${acrsaService.getStatus()}`);
});

export default app;