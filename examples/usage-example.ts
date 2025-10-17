#!/usr/bin/env ts-node

/**
 * PNPM Monorepo 使用示例
 * 
 * 这个脚本展示了如何在独立环境中使用 DLF 和 ACRSA 模块
 */

import { DlfService } from '../packages/dlf/src/index';
import { AcrsaService } from '../packages/acrsa/src/index';

async function main() {
  console.log('🚀 PNPM Monorepo 使用示例\n');

  // 初始化服务
  const dlfService = new DlfService();
  const acrsaService = new AcrsaService();

  console.log('📊 DLF 服务示例:');
  console.log('================');

  // DLF 服务使用示例
  console.log('1. 获取初始数据:');
  const initialData = dlfService.getData();
  console.log(`   数据条数: ${initialData.length}`);
  console.log(`   第一条数据: ${JSON.stringify(initialData[0], null, 2)}`);

  console.log('\n2. 添加新数据:');
  const newItem = dlfService.addData({
    name: '示例数据项',
    value: 999,
    metadata: { 
      category: 'example', 
      priority: 'high',
      description: '这是一个示例数据项'
    }
  });
  console.log(`   新增数据ID: ${newItem.id}`);

  console.log('\n3. 查询过滤数据:');
  const filteredData = dlfService.getData({
    filters: { 'metadata.category': 'example' },
    limit: 5
  });
  console.log(`   过滤后数据条数: ${filteredData.length}`);

  console.log('\n4. 获取统计信息:');
  const stats = dlfService.getStats();
  console.log(`   总数据量: ${stats.total}`);
  console.log(`   平均值: ${stats.averageValue}`);
  console.log(`   分类统计: ${JSON.stringify(stats.categories)}`);

  console.log('\n\n🔍 ACRSA 服务示例:');
  console.log('==================');

  // ACRSA 服务使用示例
  const testTexts = [
    '这个产品非常棒！我很满意这次购买。',
    '服务态度很差，完全不推荐。',
    '今天天气不错，适合出去走走。联系我：example@test.com',
    'This is an excellent product with great features!'
  ];

  for (let i = 0; i < testTexts.length; i++) {
    const text = testTexts[i];
    console.log(`\n${i + 1}. 分析文本: "${text}"`);
    
    try {
      const analysis = acrsaService.analyze(text);
      
      console.log(`   情感分析: ${analysis.sentiment.label} (${analysis.sentiment.score.toFixed(4)})`);
      console.log(`   关键词: [${analysis.keywords.slice(0, 3).join(', ')}]`);
      console.log(`   语言: ${analysis.language}`);
      console.log(`   词数: ${analysis.summary.wordCount}`);
      
      if (analysis.entities.length > 0) {
        console.log(`   实体: ${analysis.entities.map(e => `${e.type}:${e.value}`).join(', ')}`);
      }
    } catch (error) {
      console.log(`   ❌ 分析失败: ${error.message}`);
    }
  }

  console.log('\n\n🔄 文本相似度比较示例:');
  console.log('========================');
  
  const text1 = '这是一个关于机器学习的文档';
  const text2 = '这是一篇关于人工智能学习的文章';
  const similarity = acrsaService.compareSimilarity(text1, text2);
  
  console.log(`文本1: "${text1}"`);
  console.log(`文本2: "${text2}"`);
  console.log(`相似度: ${similarity.similarity.toFixed(4)}`);
  console.log(`详细信息: Jaccard=${similarity.details.jaccardIndex.toFixed(4)}, Cosine=${similarity.details.cosineDistance.toFixed(4)}`);

  console.log('\n\n🎯 组合使用示例:');
  console.log('================');
  
  // 将 DLF 数据传递给 ACRSA 进行分析
  const sampleData = dlfService.getData({ limit: 1 })[0];
  const dataDescription = `数据项 ${sampleData.name} 的值为 ${sampleData.value}，属于 ${sampleData.metadata?.category} 类别`;
  
  console.log(`生成描述: "${dataDescription}"`);
  const descriptionAnalysis = acrsaService.analyze(dataDescription);
  console.log(`描述情感: ${descriptionAnalysis.sentiment.label}`);
  console.log(`描述关键词: [${descriptionAnalysis.keywords.slice(0, 3).join(', ')}]`);

  console.log('\n✅ 示例运行完成！');
  console.log('\n💡 提示:');
  console.log('   - 启动 Portal 应用: pnpm --filter @monorepo/portal dev');
  console.log('   - 运行测试: pnpm test');
  console.log('   - 构建项目: pnpm build');
}

// 运行示例
if (require.main === module) {
  main().catch(console.error);
}

export { main };