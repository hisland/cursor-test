import * as natural from 'natural';

export interface AnalysisResult {
  sentiment: {
    score: number;
    label: 'positive' | 'negative' | 'neutral';
    confidence: number;
  };
  keywords: string[];
  entities: {
    type: string;
    value: string;
    confidence: number;
  }[];
  summary: {
    wordCount: number;
    sentenceCount: number;
    averageWordsPerSentence: number;
    readabilityScore: number;
  };
  language: string;
  timestamp: Date;
}

export interface AnalysisOptions {
  extractKeywords?: boolean;
  extractEntities?: boolean;
  calculateReadability?: boolean;
  keywordLimit?: number;
}

export class AcrsaService {
  private analyzer: any;
  private tokenizer: any;
  private stemmer: any;
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    // 初始化自然语言处理工具
    this.analyzer = new natural.SentimentAnalyzer('Chinese', 
      natural.PorterStemmer, 'afinn');
    this.tokenizer = new natural.WordTokenizer();
    this.stemmer = natural.PorterStemmer;
    this.isInitialized = true;
  }

  /**
   * 分析文本内容
   */
  public analyze(text: string, options: AnalysisOptions = {}): AnalysisResult {
    if (!text || text.trim().length === 0) {
      throw new Error('输入文本不能为空');
    }

    const {
      extractKeywords = true,
      extractEntities = true,
      calculateReadability = true,
      keywordLimit = 10
    } = options;

    // 基础文本处理
    const cleanText = this.cleanText(text);
    const tokens = this.tokenizer.tokenize(cleanText);
    const sentences = this.splitIntoSentences(cleanText);

    // 情感分析
    const sentiment = this.analyzeSentiment(tokens);

    // 关键词提取
    const keywords = extractKeywords ? 
      this.extractKeywords(cleanText, keywordLimit) : [];

    // 实体识别
    const entities = extractEntities ? 
      this.extractEntities(cleanText) : [];

    // 文本摘要统计
    const summary = this.generateSummary(tokens, sentences, calculateReadability);

    // 语言检测
    const language = this.detectLanguage(cleanText);

    return {
      sentiment,
      keywords,
      entities,
      summary,
      language,
      timestamp: new Date()
    };
  }

  /**
   * 批量分析多个文本
   */
  public batchAnalyze(texts: string[], options?: AnalysisOptions): AnalysisResult[] {
    return texts.map(text => this.analyze(text, options));
  }

  /**
   * 比较两个文本的相似度
   */
  public compareSimilarity(text1: string, text2: string): {
    similarity: number;
    method: string;
    details: {
      jaccardIndex: number;
      cosineDistance: number;
    };
  } {
    const tokens1 = new Set(this.tokenizer.tokenize(this.cleanText(text1)));
    const tokens2 = new Set(this.tokenizer.tokenize(this.cleanText(text2)));

    // Jaccard 相似度
    const intersection = new Set([...tokens1].filter(x => tokens2.has(x)));
    const union = new Set([...tokens1, ...tokens2]);
    const jaccardIndex = intersection.size / union.size;

    // 余弦距离
    const cosineDistance = natural.JaroWinklerDistance(text1, text2);

    // 综合相似度
    const similarity = (jaccardIndex + cosineDistance) / 2;

    return {
      similarity: Math.round(similarity * 10000) / 10000,
      method: 'hybrid',
      details: {
        jaccardIndex: Math.round(jaccardIndex * 10000) / 10000,
        cosineDistance: Math.round(cosineDistance * 10000) / 10000
      }
    };
  }

  /**
   * 获取服务状态
   */
  public getStatus(): string {
    return this.isInitialized ? 'ready' : 'initializing';
  }

  /**
   * 获取支持的分析功能列表
   */
  public getSupportedFeatures(): string[] {
    return [
      'sentiment_analysis',
      'keyword_extraction',
      'entity_recognition',
      'text_summary',
      'language_detection',
      'similarity_comparison',
      'batch_processing'
    ];
  }

  private cleanText(text: string): string {
    return text
      .replace(/[^\w\s\u4e00-\u9fff]/g, ' ') // 保留中文字符
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  private splitIntoSentences(text: string): string[] {
    return text.split(/[.!?。！？]+/).filter(s => s.trim().length > 0);
  }

  private analyzeSentiment(tokens: string[]): AnalysisResult['sentiment'] {
    if (tokens.length === 0) {
      return { score: 0, label: 'neutral', confidence: 0 };
    }

    // 简化的情感分析（实际应用中应使用更复杂的模型）
    const positiveWords = ['好', '棒', '优秀', '喜欢', '满意', 'good', 'great', 'excellent', 'love', 'amazing'];
    const negativeWords = ['坏', '差', '糟糕', '讨厌', '失望', 'bad', 'terrible', 'awful', 'hate', 'disappointed'];

    let score = 0;
    let matchedWords = 0;

    tokens.forEach(token => {
      if (positiveWords.includes(token)) {
        score += 1;
        matchedWords++;
      } else if (negativeWords.includes(token)) {
        score -= 1;
        matchedWords++;
      }
    });

    const normalizedScore = matchedWords > 0 ? score / tokens.length : 0;
    const confidence = Math.min(matchedWords / tokens.length * 2, 1);

    let label: 'positive' | 'negative' | 'neutral';
    if (normalizedScore > 0.1) {
      label = 'positive';
    } else if (normalizedScore < -0.1) {
      label = 'negative';
    } else {
      label = 'neutral';
    }

    return {
      score: Math.round(normalizedScore * 10000) / 10000,
      label,
      confidence: Math.round(confidence * 10000) / 10000
    };
  }

  private extractKeywords(text: string, limit: number): string[] {
    const tokens = this.tokenizer.tokenize(text);
    const stopWords = new Set(['的', '了', '在', '是', '我', '你', '他', '她', '它', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
    
    // 过滤停用词并计算词频
    const wordFreq: Record<string, number> = {};
    tokens.forEach(token => {
      if (!stopWords.has(token) && token.length > 1) {
        wordFreq[token] = (wordFreq[token] || 0) + 1;
      }
    });

    // 按频率排序并返回前N个
    return Object.entries(wordFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([word]) => word);
  }

  private extractEntities(text: string): AnalysisResult['entities'] {
    // 简化的实体识别（实际应用中应使用NER模型）
    const entities: AnalysisResult['entities'] = [];
    
    // 数字实体
    const numbers = text.match(/\d+/g);
    if (numbers) {
      numbers.forEach(num => {
        entities.push({
          type: 'NUMBER',
          value: num,
          confidence: 0.9
        });
      });
    }

    // 邮箱实体
    const emails = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g);
    if (emails) {
      emails.forEach(email => {
        entities.push({
          type: 'EMAIL',
          value: email,
          confidence: 0.95
        });
      });
    }

    // URL实体
    const urls = text.match(/https?:\/\/[^\s]+/g);
    if (urls) {
      urls.forEach(url => {
        entities.push({
          type: 'URL',
          value: url,
          confidence: 0.9
        });
      });
    }

    return entities;
  }

  private generateSummary(tokens: string[], sentences: string[], calculateReadability: boolean): AnalysisResult['summary'] {
    const wordCount = tokens.length;
    const sentenceCount = sentences.length;
    const averageWordsPerSentence = sentenceCount > 0 ? wordCount / sentenceCount : 0;
    
    let readabilityScore = 0;
    if (calculateReadability && sentenceCount > 0) {
      // 简化的可读性评分（基于平均句长）
      readabilityScore = Math.max(0, 100 - averageWordsPerSentence * 2);
    }

    return {
      wordCount,
      sentenceCount,
      averageWordsPerSentence: Math.round(averageWordsPerSentence * 100) / 100,
      readabilityScore: Math.round(readabilityScore * 100) / 100
    };
  }

  private detectLanguage(text: string): string {
    // 简化的语言检测
    const chineseChars = text.match(/[\u4e00-\u9fff]/g);
    const englishChars = text.match(/[a-zA-Z]/g);
    
    const chineseRatio = chineseChars ? chineseChars.length / text.length : 0;
    const englishRatio = englishChars ? englishChars.length / text.length : 0;

    if (chineseRatio > 0.3) {
      return 'zh';
    } else if (englishRatio > 0.5) {
      return 'en';
    } else {
      return 'unknown';
    }
  }
}

export default AcrsaService;