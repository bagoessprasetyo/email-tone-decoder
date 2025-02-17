export interface AnalysisHighlight {
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  start: number;
  end: number;
}

export interface ToneSuggestion {
  type: 'tone_improvement';
  text: string;
  replacements: Array<{
    original: string;
    suggestion: string;
  }>;
}

export interface CulturalWarning {
  type: 'cultural_sensitivity';
  text: string;
  locations: Array<{
    start: number;
    end: number;
  }>;
}

export interface EmailAnalysis {
  sentiment: {
    score: number;
    label: string;
    highlights: AnalysisHighlight[];
  };
  tone: {
    primary: string;
    secondary: string[];
    suggestions: ToneSuggestion[];
  };
  cultural: {
    context: string;
    warnings: CulturalWarning[];
  };
}

export interface AnalyzeEmailRequest {
  content: string;
}

export type AnalyzeEmailResponse = EmailAnalysis;