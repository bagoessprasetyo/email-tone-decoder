import { FC } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EmailTemplate {
  id: string;
  name: string;
  content: string;
}

interface EmailTemplatesProps {
  onSelectTemplate: (content: string) => void;
}

const templates: EmailTemplate[] = [
  {
    id: 'follow-up',
    name: 'Follow-up Email',
    content: `Dear [Name],

I hope this email finds you well. I'm writing to follow up on our previous discussion regarding [topic].

I wanted to check if you've had a chance to review the information I sent and if you have any questions or concerns I can address.

Looking forward to your response.

Best regards,
[Your name]`
  },
  {
    id: 'apology',
    name: 'Apology Email',
    content: `Dear [Name],

I sincerely apologize for [incident/situation]. I understand this may have caused inconvenience, and I take full responsibility.

To address this situation, I will [corrective action]. I assure you that steps are being taken to prevent similar incidents in the future.

Thank you for your understanding.

Best regards,
[Your name]`
  },
  {
    id: 'request',
    name: 'Request Email',
    content: `Dear [Name],

I hope you're doing well. I am writing to request [specific request].

[Explanation of why this request is important/necessary]

I would greatly appreciate your help with this matter. Please let me know if you need any additional information.

Thank you for your time and consideration.

Best regards,
[Your name]`
  },
  {
    id: 'introduction',
    name: 'Introduction Email',
    content: `Dear [Name],

I hope this email finds you well. My name is [Your name] and I am reaching out regarding [reason for contact].

[Brief background information or mutual connection]

I would appreciate the opportunity to [specific request or next step].

Thank you for your time.

Best regards,
[Your name]`
  }
];

export const EmailTemplates: FC<EmailTemplatesProps> = ({ onSelectTemplate }) => {
  return (
    <div className="mb-4">
      <Select onValueChange={(value) => {
        const template = templates.find(t => t.id === value);
        if (template) {
          onSelectTemplate(template.content);
        }
      }}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Choose template" />
        </SelectTrigger>
        <SelectContent>
          {templates.map((template) => (
            <SelectItem key={template.id} value={template.id}>
              {template.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};