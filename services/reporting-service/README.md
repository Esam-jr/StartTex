**Reporting & Analytics Service**
=================================

**Overview**
------------

The **Reporting & Analytics Service** is responsible for collecting, processing, and presenting data insights across the Startup Management System. This service helps stakeholders---including administrators, sponsors, and program managers---track the performance of startup calls, evaluate user engagement, and generate custom reports for strategic decision-making. It transforms raw data into meaningful analytics, promoting transparency and continuous improvement.


**Core Functionalities**
------------------------

### 1\. **Performance Analytics**

-   Monitors and analyzes key metrics such as:

    -   Number of startup applications submitted per call.

    -   Acceptance and rejection rates.

    -   Reviewer activity and evaluation trends.

    -   Sponsor engagement levels (e.g., number of sponsored projects, donation volumes).

-   Supports visualizations such as charts and dashboards for real-time insights.

### 2\. **Custom Report Generation**

-   Allows authorized users to generate custom reports on demand.

-   Supports filtering by date range, startup call, user role, and performance indicators.

-   Exports reports in formats like PDF or CSV for sharing or record-keeping.

### 3\. **Data Aggregation**

-   Gathers data from multiple microservices (e.g., Startup Idea Submission, Sponsorship Management, Project Tracking) through APIs.

-   Periodic synchronization ensures data remains up to date for accurate reporting.


**Interactions with Other Services**
------------------------------------

-   **Startup Call Management**: Retrieves startup call schedules, statuses, and participation metrics.

-   **Startup Idea Submission & Evaluation**: Collects submission counts, evaluation scores, and feedback analytics.

-   **Sponsorship Management**: Analyzes sponsorship data such as donation amounts and sponsor activity.

-   **Project Tracking**: Aggregates milestone completion and progress data from ongoing projects.

-   **Auth & User Management**: Provides role-based access control for report visibility and user segmentation.


**Entities & Data Model**
-------------------------

### 1\. **AnalyticsRecord**

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Unique identifier for each analytics record |
| dataType | String | Type of data (e.g., "Submissions", "Sponsors") |
| dataValue | JSON | Key metrics and values |
| createdAt | DateTime | Timestamp of record creation |

* * * * *

### 2\. **CustomReport**

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Unique identifier for each report |
| title | String | Descriptive report title |
| filters | JSON | Selected filters (date range, roles, metrics) |
| generatedBy | UUID | User ID of the report creator |
| fileUrl | String | Link to the exported report (if applicable) |
| createdAt | DateTime | Timestamp of report generation |


**API Endpoints**
-----------------

| Method | Endpoint | Description | Auth Role |
| --- | --- | --- | --- |
| GET | /analytics/overview | Retrieve general performance metrics overview | Admin |
| GET | /analytics/startup-calls | View analytics related to startup call submissions | Admin, Sponsor |
| GET | /analytics/sponsorships | View sponsorship engagement and funding analytics | Admin, Sponsor |
| POST | /reports | Generate a new custom report | Admin |
| GET | /reports/:id | Download or view a specific report | Admin, Report Creator |
| GET | /reports | List generated reports for the authenticated user | Admin |


**Access Control (Auth Roles)**
-------------------------------

-   **Admin**: Full access to analytics dashboards and report generation.

-   **Sponsor**: Can access sponsorship-related analytics and relevant reports.

-   **Report Creator**: Users who generate custom reports can access their reports.


**Key Workflows**
-----------------

1.  **Real-Time Analytics Workflow**

    -   Service pulls data from other services periodically → Aggregates and processes it → Displays real-time charts and stats via the UI dashboard.

2.  **Custom Report Generation Workflow**

    -   Admin selects filters and metrics → Service queries relevant data → Formats report → Provides download link.

3.  **Scheduled Reporting Workflow (Optional)**

    -   Admin sets a schedule for recurring reports → Service generates reports at defined intervals → Emails or stores report links for access.


**Conclusion**
--------------

The **Reporting & Analytics Service** transforms operational data into actionable insights. It supports informed decision-making, allows sponsors and administrators to measure impact, and promotes transparency across the platform. By centralizing performance data and offering flexible reporting options, it becomes a vital tool for ongoing improvement and accountability.
