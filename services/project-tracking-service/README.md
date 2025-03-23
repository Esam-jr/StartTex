Project Tracking & Milestone Management Service
===============================================

Overview
--------

The Project Tracking & Milestone Management Service plays a pivotal role in supporting the operational journey of accepted startups. Once a startup idea has been approved, this service helps entrepreneurs manage, monitor, and visualize their projects' progress. It offers structured tools for planning tasks, setting milestones, and tracking achievements, ensuring that startups can stay organized, meet deadlines, and demonstrate progress to stakeholders.

Additionally, it allows administrators, sponsors, and mentors to gain visibility into the startups' development, providing an environment for better collaboration, accountability, and support.

Core Responsibilities
---------------------

1.  **Project Onboarding for Accepted Startups** Every startup whose idea has been accepted is automatically onboarded into the Project Tracking system. It allows them to set up project details, goals, and timelines.

2.  **Milestone and Task Management** Startups can break down their projects into manageable tasks and milestones. This includes assigning deadlines, responsible team members, and deliverables.

3.  **Progress Visualization** Provides intuitive dashboards and visual tools like Gantt charts or progress bars, allowing startups and stakeholders to quickly understand the current status of the project.

4.  **Collaboration Tools Integration** Enables team members, mentors, and stakeholders to comment on tasks, suggest improvements, and stay updated on progress.

5.  **Reporting for Stakeholders** Generates real-time reports and updates to sponsors, administrators, or mentors on the startups' ongoing activities and milestones achieved.


Key Features
------------

### 1\. **Startup Project Onboarding**

-   Automatically initializes a project profile for startups whose ideas have been approved.
-   Allows startups to define their primary objectives, expected outcomes, and initial project details.

### 2\. **Task & Milestone Definition**

-   Startups can create milestones (key objectives) and break them into specific, actionable tasks.
-   Each task/milestone includes:
    -   Title & Description
    -   Assigned team member(s)
    -   Start and Due Dates
    -   Priority (Low, Medium, High)
    -   Status (Pending, In Progress, Completed)
    -   Attachments if necessary (documents, reports)

### 3\. **Progress Tracking**

-   Visual dashboards showing:
    -   Percentage completion of milestones
    -   Deadlines approaching
    -   Task breakdown per milestone
-   Gantt charts or progress bars for visual representation.

### 4\. **Collaboration & Comments**

-   Task-level and milestone-level comment sections for discussion.
-   Mentors and administrators can leave feedback or suggestions on specific tasks.

### 5\. **Real-time Notifications**

-   Integrated with the Notification Service to alert startups of upcoming deadlines, overdue tasks, or completed milestones.

### 6\. **Reporting Tools**

-   Auto-generated reports summarizing startup progress, milestone completion rates, and pending actions.
-   Accessible by sponsors, mentors, and admins.

* * * * *

Project & Milestone Model
-------------------------
```
`// Simplified TypeScript-style schema

Project {
  id: UUID;
  startupId: UUID; // Reference to the accepted startup
  projectName: string;
  description: string;
  objectives: string;
  startDate: Date;
  endDate: Date;
  status: Enum; // Not Started, In Progress, Completed
  progressPercentage: number;
  milestones: [Milestone];
  createdAt: Date;
  updatedAt: Date;
}

Milestone {
  id: UUID;
  projectId: UUID;
  title: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  status: Enum; // Pending, In Progress, Completed
  tasks: [Task];
  priority: Enum; // Low, Medium, High
  comments: [Comment];
}

Task {
  id: UUID;
  milestoneId: UUID;
  title: string;
  description: string;
  assignedTo: string; // Team member name or email
  startDate: Date;
  dueDate: Date;
  status: Enum; // Pending, In Progress, Completed
  attachments: [File];
}

Comment {
  id: UUID;
  milestoneId: UUID;
  author: string;
  content: string;
  createdAt: Date;
}`

```
API Endpoints Overview
----------------------

The following endpoints allow startups, mentors, administrators, and sponsors to interact with the Project Tracking & Milestone Management Service. Each endpoint has clearly defined access permissions, ensuring that only authorized users can perform specific actions based on their role.

| Method | Endpoint | Description | Auth Role |
| --- | --- | --- | --- |
| **POST** | `/projects` | Automatically create a new project for startups whose ideas are accepted. This endpoint is typically triggered by the Startup Idea Submission & Evaluation Service. | **Admin (System Triggered)** |
| **GET** | `/projects/{id}` | Retrieve details of a specific project, including objectives, progress, milestones, and tasks. | **Startup Team, Mentor, Admin, Sponsor (View Only)** |
| **PUT** | `/projects/{id}` | Update project objectives, description, or overall status (e.g., changing from "Not Started" to "In Progress"). | **Startup Team, Admin** |
| **POST** | `/projects/{id}/milestones` | Create a new milestone within a project. Startups use this to break their project into key phases. | **Startup Team** |
| **GET** | `/milestones/{id}` | Retrieve details of a specific milestone, including associated tasks and comments. | **Startup Team, Mentor, Admin, Sponsor (View Only)** |
| **PUT** | `/milestones/{id}` | Update milestone information, including deadlines, descriptions, or status. | **Startup Team** |
| **POST** | `/milestones/{id}/tasks` | Add new tasks under a specific milestone. Startups manage their workflow by defining individual tasks. | **Startup Team** |
| **GET** | `/tasks/{id}` | Retrieve specific task details, including assignment, deadlines, and status. | **Startup Team, Mentor, Admin (View Only)** |
| **PUT** | `/tasks/{id}` | Update task information, such as status (e.g., marking as "Completed") or assigned team member. | **Startup Team** |
| **POST** | `/milestones/{id}/comments` | Add comments or feedback on a milestone. Mentors and Admins use this to provide guidance, while Startup Teams can discuss internally. | **Startup Team, Mentor, Admin** |
| **GET** | `/projects/{id}/report` | Generate a comprehensive progress report, showing overall project status, milestones achieved, pending tasks, and deadlines. Accessible by sponsors and admins for monitoring purposes. | **Admin, Sponsor, Mentor (Read-Only)** |


Dependencies & Integrations
---------------------------

-   **Auth & User Management Service** -- To control access and allow only authenticated startup teams, mentors, and admins to manage and view projects.
-   **Notification Service** -- To send notifications about deadlines, status changes, or completed milestones.
-   **Reporting & Analytics Service** -- Optionally integrates for higher-level performance analysis of startups' project delivery over time.


Notes:
------

-   Projects are only initialized for accepted startups (validated via Startup Idea Submission & Evaluation Service).
-   Access control ensures that startups can manage their projects, while mentors, sponsors, and admins have view or comment rights.
-   Real-time data synchronization guarantees that progress updates are immediately reflected in dashboards and reports.
