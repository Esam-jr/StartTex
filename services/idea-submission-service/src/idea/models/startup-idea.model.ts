// src/ideas/models/startup-idea.model.ts
export interface StartupIdea {
  id: string;
  startupName: string;
  website: string;
  foundedDate: Date;
  location: string;
  industry: string; // Example: SaaS, CleanTech
  stage: string; // Example: Idea, MVP, Scaling
  legalStructure: string; // Example: Sole Proprietorship, LLC
  submissionDate: Date;
  status: string; // Example: Pending, Under Review, Accepted, Rejected
  founders: Array<{
    name: string;
    role: string;
    linkedInUrl: string;
    email: string;
    bio: string;
  }>;
  teamSize: string;
  advisors: Array<{
    name: string;
    expertise: string;
    linkedInUrl: string;
  }>;
  problemStatement: string;
  solution: string;
  productStage: string;
  ipStatus: string;
  demoUrl: string;
  targetMarket: string;
  marketSize: string;
  tractionMetrics: string;
  competitors: string;
  revenueModel: string;
  fundingHistory: string;
  financialProjectionsUrl: string;
  fundingAsk: string;
  pitchDeckUrl: string;
  customerTestimonials: string;
  attachments: Array<File>;
  optionalFields: {
    videoPitchUrl?: string;
    socialImpact?: string;
    technicalDocsUrl?: string;
    references?: Array<string>;
    milestones?: string;
  };
  assignedReviewerIds: Array<string>;
  reviewStartDate: Date;
  reviewEndDate: Date;
  averageScore: number;
  feedbackSummary: string;
}
