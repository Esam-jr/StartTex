**Financial Planning & Budget Allocation Service**
==================================================

**Overview**
------------

The Financial Planning & Budget Allocation Service is a dedicated microservice responsible for helping both system administrators and startup founders manage budgets effectively. It facilitates the creation, allocation, tracking, and analysis of financial resources associated with startup calls and accepted startup projects.

The service ensures that each startup call has a well-defined financial structure and allows for real-time oversight of how allocated funds are utilized. It also provides valuable insights into financial performance and resource efficiency, supporting both strategic decision-making and financial transparency.

This service supports both **budget planning** for startup calls (at the program or sponsor level) and **budget allocation** for individual startup projects post-acceptance. It also tracks expenditures, monitors financial health, and allows startups to submit periodic financial reports.


**Key Functionalities**
-----------------------

### 1\. **Budget Definition for Startup Calls**

-   Administrators can create **budget plans** for each startup call, specifying the total budget, funding sources (e.g., sponsor contributions), and budget categories (e.g., product development, marketing, operations).

-   Budget plans help ensure that financial resources are clearly structured before accepting startup ideas into the program.

### 2\. **Budget Allocation to Startups**

-   Upon acceptance into a startup call, individual startups receive **budget allocations** from the main call budget.

-   Allocations are defined based on startup needs, available funds, and sponsor preferences.

-   Allocated funds are categorized, allowing startups to manage specific line-items within their funding.

### 3\. **Expenditure Tracking and Reporting**

-   Startups submit **financial expenditure reports**, detailing how allocated funds have been used across categories.

-   Administrators can review and approve/reject these reports, ensuring compliance with budget plans and responsible use of funds.

-   The system supports **real-time financial tracking dashboards**, offering visibility into fund utilization per startup or call.

### 4\. **Financial Analytics and Oversight**

-   The service provides **analytical tools** to evaluate budget utilization efficiency, identify over/under-spending trends, and forecast future budget needs.

-   Periodic **financial health summaries** are available for each startup and startup call, aiding stakeholders in financial planning and audits.


**Interactions with Other Services**
------------------------------------

-   **Sponsorship Management Service**: Provides funding sources and sponsor-related financial inputs for startup call budgets.

-   **Startup Call Management Service**: Supplies call identifiers and scheduling, triggering the creation of corresponding budget plans.

-   **Startup Idea Submission & Evaluation Service**: Supplies the list of accepted startups requiring budget allocations.

-   **Communication Service**: Used for notifying startups about approved budgets, report reviews, or funding changes.

-   **Reporting & Analytics Service**: Aggregates financial data for higher-level performance reporting.


**Entities & Data Model**
-------------------------

The service manages the following key entities:

### 1\. **StartupCallBudget**

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Unique identifier for the budget |
| startupCallId | UUID | Reference to startup call |
| totalBudgetAmount | Decimal | Total available budget for the call |
| fundingSources | Array | List of sponsors and contributions |
| budgetCategories | Array | Categories and allocated amounts |
| createdAt | DateTime | Timestamp of budget plan creation |


### 2\. **StartupBudgetAllocation**

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Unique allocation ID |
| startupId | UUID | Reference to accepted startup |
| startupCallBudgetId | UUID | Reference to the main call budget |
| allocationAmount | Decimal | Total allocated to the startup |
| categoryAllocations | Array | Line-item allocations by category |
| allocationDate | DateTime | Timestamp of allocation |


### 3\. **ExpenditureReport**

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Unique report ID |
| startupId | UUID | Reference to the reporting startup |
| startupBudgetAllocationId | UUID | Reference to the allocated budget |
| reportPeriod | String | Period of report (e.g., Q1 2025) |
| expenditureDetails | Array | List of expenditures by category |
| totalSpent | Decimal | Total expenditure in report |
| status | Enum | Pending, Approved, Rejected |
| submittedAt | DateTime | Submission timestamp |
| reviewedAt | DateTime | Review timestamp |


**API Endpoints**
-----------------

| Method | Endpoint | Description | Auth Role |
| --- | --- | --- | --- |
| POST | /budgets/startup-call | Create budget plan for a startup call | Admin |
| GET | /budgets/startup-call/:callId | Get budget plan for a specific call | Admin |
| POST | /budgets/startup-allocation | Allocate budget to an accepted startup | Admin |
| GET | /budgets/startup-allocation/:startupId | View allocation for a specific startup | Admin, Startup |
| POST | /expenditures/report | Submit expenditure report by startup | Startup |
| GET | /expenditures/report/:startupId | View submitted reports for a startup | Admin, Startup |
| PUT | /expenditures/report/:reportId/review | Approve or reject expenditure report | Admin |
| GET | /analytics/budget-utilization | Get overview of fund utilization by call/startup | Admin |


**Access Control (Auth Roles)**
-------------------------------

-   **Admin**: Full access to all budget creation, allocation, review, and analytics.

-   **Startup**: Can view allocated budgets and submit expenditure reports.

-   **Sponsor** *(Optional view only)*: Potential to allow sponsors to view usage of their contributed funds (read-only).

**Key Workflows**
-----------------

1.  **Budget Planning Workflow**

    -   Admin creates startup call budget → Defines funding sources → Sets categories.

2.  **Allocation Workflow**

    -   Startup accepted → Admin allocates funds → Notifies startup.

3.  **Financial Reporting Workflow**

    -   Startup spends funds → Submits report → Admin reviews → Approves or requests corrections.

4.  **Analytics Workflow**

    -   System generates real-time summaries for admin oversight and decision-making.


**Conclusion**
--------------

This service plays a critical role in enabling **structured financial planning** and **transparent fund management** across startup programs. It ensures responsible allocation, supports startups in financial discipline, and delivers insights into fund utilization, helping stakeholders maximize the impact of financial resources.
