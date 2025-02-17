import { Check } from "lucide-react";

const features = [
  {
    title: "Instant Tone Analysis",
    description: "Get real-time feedback on how your email might be perceived by the recipient."
  },
  {
    title: "Professional Suggestions",
    description: "Receive actionable recommendations to improve your email's tone and effectiveness."
  },
  {
    title: "Multiple Tone Detection",
    description: "Analyze for various emotional tones including professional, friendly, urgent, and more."
  },
  {
    title: "Context-Aware",
    description: "Our AI understands the context of your message to provide accurate tone assessments."
  }
];

export function Features() {
  return (
    <div id="features" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Everything you need for perfect email tone</h2>
          <p className="text-lg text-muted-foreground mt-4">
            Powerful features to help you craft the perfect message every time
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 items-start p-6 rounded-lg transition-all duration-200 hover:bg-blue-950/20 hover:scale-[1.02]">
              <div className="mt-1 bg-blue-600 rounded-full p-1.5 transition-transform duration-200 group-hover:scale-110">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}