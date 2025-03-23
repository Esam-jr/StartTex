Startup Idea Submission & Evaluation Service
============================================

## Overview

The **Startup Idea Submission & Evaluation Service** serves as the gateway for entrepreneurs to submit their startup proposals and undergo structured evaluations. It plays a critical role in ensuring that only high-potential, well-structured startup ideas proceed further in the system. The service streamlines the process of idea submission, reviewer assignment, evaluation workflows, and feedback dissemination.

This microservice is central to maintaining the quality and fairness of the startup selection process, supporting transparency, and encouraging entrepreneurs to present their ideas confidently.

Core Responsibilities
---------------------

1.  **Idea Submission Portal**

    -   Provides entrepreneurs with an intuitive portal where they can submit their startup ideas.
    -   Includes guidelines, templates, and instructions to assist applicants in presenting their proposals effectively.
    -   Ensures all submissions are stored systematically for later evaluation.
2.  **Idea Screening & Automated Assessment**

    -   Implements a criteria-based initial screening to filter out incomplete or irrelevant submissions.
    -   Optionally, utilizes machine learning models to perform an automated assessment based on predefined criteria (e.g., market potential, innovation, feasibility).
3.  **Reviewer Pool Management**

    -   Maintains a pool of expert reviewers drawn from industry professionals, investors, or academic circles.
    -   Tracks reviewer expertise, availability, and previous evaluations.
4.  **Automated Reviewer Assignment**

    -   Matches submitted ideas to suitable reviewers based on their area of expertise and availability.
    -   Ensures a fair distribution of workload among reviewers.
5.  **Review Workflow**

    -   Provides reviewers with a structured interface to evaluate ideas, assign scores, and leave comments.
    -   Tracks the status of each review, including pending, completed, or flagged evaluations.
6.  **Feedback Mechanism**

    -   Aggregates reviewer feedback and generates formal acceptance/rejection notifications.
    -   Offers constructive feedback to applicants, enhancing transparency and learning opportunities.

Data Models
-----------

### Startup Idea Model
```
// Simplified TypeScript-style schema
StartupIdea {
  id: UUID;
  startupName: string;
  website: string;
  foundedDate: Date;
  location: string;
  industry: Enum; // SaaS, CleanTech, etc.
  stage: Enum; // Idea, MVP, Scaling, etc.
  legalStructure: Enum;
  submissionDate: DateTime;
  status: Enum; // Pending, Under Review, Accepted, Rejected

  founders: [
    {
      name: string;
      role: string;
      linkedInUrl: string;
      email: string;
      bio: string;
    }
  ];
  teamSize: string;
  advisors: [
    {
      name: string;
      expertise: string;
      linkedInUrl: string;
    }
  ];

  problemStatement: string;
  solution: string;
  productStage: Enum;
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
  attachments: [File];

  optionalFields: {
    videoPitchUrl?: string;
    socialImpact?: string;
    technicalDocsUrl?: string;
    references?: [string];
    milestones?: string;
  };

  assignedReviewerIds: [UUID];
  reviewStartDate: DateTime;
  reviewEndDate: DateTime;
  averageScore: number;
  feedbackSummary: string;
}
```

### Reviewer Model

| Field | Description |
| --- | --- |
| id | Unique identifier |
| name | Reviewer's full name |
| expertiseAreas | Areas of expertise (tags/categories) |
| availabilityStatus | Available, Unavailable |
| evaluationsDone | Count of evaluations completed |
| contactDetails | Contact information |


### Evaluation Model

| Field | Description |
| --- | --- |
| id | Unique identifier |
| reviewerId | Reviewer assigned |
| startupIdeaId | Associated startup idea |
| score | Numeric score based on criteria |
| comments | Reviewer's comments and suggestions |
| status | Completed, Pending |
| evaluationDate | Timestamp |


API Endpoints
-------------

### Idea Submission

| Method | Endpoint | Description | Auth Role |
| --- | --- | --- | --- |
| POST | /ideas | Submit a new startup idea | Entrepreneur |
| GET | /ideas | Get all submitted ideas (Admin/Reviewer access) | Admin/Reviewer |
| GET | /ideas/{id} | View specific startup idea details | Admin/Reviewer/Owner |
| PUT | /ideas/{id} | Update idea details (before review) | Entrepreneur |
| DELETE | /ideas/{id} | Withdraw an idea | Entrepreneur |


### Reviewer Management

| Method | Endpoint | Description | Auth Role |
| --- | --- | --- | --- |
| POST | /reviewers | Add new reviewer | Admin |
| GET | /reviewers | View reviewer pool | Admin |
| PUT | /reviewers/{id} | Update reviewer availability/expertise | Admin |


### Evaluation Workflow

| Method | Endpoint | Description | Auth Role |
| --- | --- | --- | --- |
| POST | /evaluations/assign | Assign reviewers to an idea | Admin |
| GET | /evaluations/{reviewerId} | Get list of assigned evaluations | Reviewer |
| PUT | /evaluations/{id} | Submit evaluation (score + comments) | Reviewer |
| GET | /evaluations/idea/{ideaId} | Get all evaluations for an idea | Admin/Reviewer |


### Feedback and Result

| Method | Endpoint | Description | Auth Role |
| --- | --- | --- | --- |
| GET | /ideas/{id}/feedback | Get aggregated feedback and result | Entrepreneur/Admin |
| POST | /ideas/{id}/notify | Notify applicant of result | Admin (trigger Notification Service) |


Dependencies
------------

-   **Authentication & User Management Service**

    -   Ensures authenticated access for Entrepreneurs, Reviewers, and Admins.
    -   Role-based access control.
-   **Notification Service**

    -   Sends feedback notifications to applicants.
-   **Reporting & Analytics Service**

    -   Pulls evaluation and submission data for performance analysis.


Database
--------

A dedicated PostgreSQL database with:

-   `StartupIdeas` table
-   `Reviewers` table
-   `Evaluations` table

Includes relational integrity, timestamps, and proper indexing for efficient query performance.


Interactions with Other Services
--------------------------------

1.  **Notification Service**

    -   Sends result announcements and feedback to entrepreneurs post-evaluation.
2.  **Reporting & Analytics Service**

    -   Provides metrics such as submission rates, acceptance rates, and reviewer performance.
3.  **Project Tracking Service**

    -   Transfers accepted startup ideas to initiate project tracking.


Security & Access Control
-------------------------

-   Entrepreneurs can only access and manage their own submissions.
-   Reviewers can only access ideas assigned to them.
-   Admins have full access to submissions, reviewers, and evaluation processes.
-   OAuth + JWT secured access, integrated with central authentication.


Future Enhancements
-------------------

-   **Machine Learning-Based Initial Screening**

    -   Incorporate advanced models for intelligent filtering and ranking.
-   **Reviewer Performance Metrics**

    -   Introduce scoring for reviewers based on feedback quality and evaluation completion time.
-   **Enhanced Reviewer Matching**

    -   Fine-grained reviewer assignment using AI/ML recommendation systems.


Summary
-------

The **Startup Idea Submission & Evaluation Service** is pivotal to maintaining the integrity, transparency, and efficiency of the startup onboarding process. It offers structured workflows for idea submission, expert evaluation, and constructive feedback, ensuring that the best entrepreneurial ideas progress to the next stage.
