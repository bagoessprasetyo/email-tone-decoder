import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { ScrollArea } from "../ui/scroll-area";

interface Highlight {
  text: string;
  sentiment: string;
  start: number;
  end: number;
}

interface Suggestion {
  type: string;
  text: string;
  replacements?: { original: string; suggestion: string }[];
}

interface Warning {
  type: string;
  text: string;
  locations: { start: number; end: number }[];
}

interface AnalysisProps {
  analysis: {
    sentiment: {
      score: number;
      label: string;
      highlights: Highlight[];
    };
    tone: {
      primary: string;
      secondary: string[];
      suggestions: Suggestion[];
    };
    cultural: {
      context: string;
      warnings: Warning[];
    };
  };
  onApplySuggestion: (original: string, suggestion: string) => void;
}

export function AnalysisResults({ analysis }: { analysis: string }) {
  if (!analysis) return null;

  return (
    <Card className="w-full h-full overflow-auto">
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-sm max-w-none dark:prose-invert">
        <ScrollArea className="h-[500px] p-6">
            <ReactMarkdown
            components={{
                code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                    <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                    >
                    {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                ) : (
                    <code className={className} {...props}>
                    {children}
                    </code>
                );
                },
            }}
            >
            {analysis}
            </ReactMarkdown>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}