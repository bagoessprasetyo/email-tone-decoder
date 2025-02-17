"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AnalysisResults } from "@/components/blocks/AnalysisResults";
import { EmailTemplates } from "@/components/blocks/EmailTemplates";
import { Sidebar } from "@/components/blocks/Sidebar";
import { Loader2 } from "lucide-react";

interface EmailDraft {
  content: string;
  lastSaved: Date;
}

export default function ComposePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [rawcontent, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  // Auto-save functionality
  useEffect(() => {
    const saveDraft = async () => {
      if (rawcontent.trim()) {
        // TODO: Implement actual save to backend
        setLastSaved(new Date());
      }
    };

    const timer = setTimeout(saveDraft, 2000);
    return () => clearTimeout(timer);
  }, [rawcontent]);

  // Update character count
  useEffect(() => {
    setCharCount(rawcontent.length);
  }, [rawcontent]);

  const handleAnalyze = async () => {
    if (!rawcontent.trim()) return;
    const content = `Analyze the tone of the following email text and provide a detailed report in the format specified below.

**Email Text:**
${rawcontent}

**Analysis Requirements:**

1.  **Sentiment Analysis:** Determine the overall sentiment of the email.  Classify it as:
    *   Positive
    *   Negative
    *   Neutral

2.  **Tone Detection:** Identify the dominant tones present in the email. Select from the following tone categories (you can select multiple if applicable):
    *   Formal
    *   Informal
    *   Direct
    *   Polite
    *   Urgent
    *   Friendly
    *   Critical
    *   Assertive
    *   Passive
    *   Sarcastic
    *   Humorous
    *   Neutral

3.  **Potential Misinterpretation Flags:**  Carefully review the email for any phrases or sentences that could be misinterpreted or perceived differently than intended. Highlight specific sentences and explain the potential for misinterpretation.  Consider aspects like:
    *   Sarcasm (especially if not clearly marked)
    *   Overly demanding or blunt phrasing
    *   Lack of clarity or ambiguity
    *   Phrases that might sound dismissive or condescending

4.  **Tone Report:**  Generate a concise tone report with the following sections:

    *   **Overall Tone Score:**  Provide scores (out of 10) for:
        *   Professionalism (1-10, 10 being highly professional)
        *   Friendliness (1-10, 10 being very friendly)
        *   Clarity (1-10, 10 being very clear)

    *   **Tone Descriptors:** List the dominant tones detected from the "Tone Detection" section.  Also, include a "Potential Tone Risks" subsection if any misinterpretation flags were identified.  Example format:
        
        Dominant Tones Detected: [List of tones, e.g., Direct, Professional, Polite]
        Potential Tone Risks: [Sentence X] -  Phrasing could be perceived as [Negative Tone, e.g., overly demanding].
                               [Sentence Y] -  May be interpreted as [Unintended Tone, e.g., sarcastic].
        

    *   **Rewrite Suggestions (Optional):** For any sentences flagged in "Potential Tone Risks," offer *brief* and *optional* rewrite suggestions to mitigate the risk of misinterpretation and adjust the tone.  Focus on suggesting softer, clearer, or more polite phrasing.  Example format:
        
        Rewrite Suggestions:
        For: [Sentence X - flagged sentence]
        Consider: [Alternative phrasing, e.g., "Please ensure this is completed by [date] at your earliest convenience."]
        
        Note: please add emojis to make the tone report more engaging.`;

    const body = JSON.stringify({ content });
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });
      const data = await response.json();
      if (data) {
        setAnalysis(data);
      } else {
        console.error("Analysis failed:", data.error);
      }
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="flex-1 min-h-screen bg-background p-4 md:p-8 overflow-y-auto"
      >
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div 
            initial={{ y: -20 }} 
            animate={{ y: 0 }} 
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">Compose Email</h1>
              <p className="text-sm text-muted-foreground">Create and analyze your email content</p>
            </div>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-sm text-muted-foreground flex items-center gap-3"
            >
              {lastSaved && (
                <span className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Last saved: {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Composition Area */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 0.2 }} 
              className="space-y-4"
            >
              <EmailTemplates onSelectTemplate={setContent} />
              <div className="relative bg-card/50 backdrop-blur-sm rounded-lg border-2 border-primary/20 shadow-lg overflow-hidden">
                <textarea
                  className="w-full h-[600px] p-6 bg-transparent resize-none focus:outline-none text-lg leading-relaxed"
                  value={rawcontent}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start typing your email..."
                  style={{ scrollbarWidth: 'thin' }}
                />
                <div className="absolute bottom-0 right-0 left-0 p-4 bg-background/80 backdrop-blur-sm border-t border-primary/10 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                    {charCount} characters
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !rawcontent.trim()}
                    className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 font-medium flex items-center gap-2 shadow-lg transition-all duration-200"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze'
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Analysis Area */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 0.3 }} 
              className="bg-card/50 backdrop-blur-sm p-8 rounded-lg border-2 border-primary/20 shadow-lg"
            >
              <AnimatePresence mode="wait">
              </AnimatePresence>
                {!analysis ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    className="text-center text-muted-foreground"
                  >
                  Analysis results will appear here
                </motion.div>
              ) : (
                <AnalysisResults
                  analysis={analysis}
                />
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}