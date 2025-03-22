Startup Call Management Service
===============================


Overview
--------

The **Startup Call Management Service** is responsible for handling all activities related to the announcement, promotion, and management of startup calls. A "Startup Call" refers to an official invitation for entrepreneurs to submit their startup ideas, typically within a specific time window, accompanied by guidelines, categories, and associated events.

This microservice enables administrators to create and manage startup calls, set deadlines, publish relevant events, and promote the calls via social media integrations. Additionally, it exposes APIs that allow other services (such as the Idea Submission Service) and clients to retrieve active calls and event calendars.

It plays a foundational role in ensuring that the startup ecosystem remains dynamic, organized, and accessible to potential applicants and stakeholders.


Core Responsibilities
---------------------

1.  **Startup Call Creation & Management**

    -   Administrators can define new startup calls, including title, description, categories, submission guidelines, deadlines, and promotional materials.
    -   Capability to update, delete, or archive old startup calls.
2.  **Promotion Tools**

    -   Generate sharable promotional links or materials for distribution across social media platforms, newsletters, and websites.
    -   Future extension: Integration with third-party APIs (e.g., Twitter, LinkedIn) to automate promotion.
3.  **Events Calendar Management**

    -   Maintain a calendar of key dates and deadlines tied to startup calls, such as submission open dates, evaluation phases, and result announcements.
    -   Public API for clients and applicants to view upcoming events.
4.  **Public API for Calls & Events**

    -   Provides endpoints for users and other services to query active startup calls, guidelines, and upcoming events.


Data Models
-----------

### Startup Call Model

| Field | Description |
| --- | --- |
| **id** | Unique identifier |
| **title** | Title of the startup call |
| **description** | Detailed description and objectives |
| **categories** | Array of categories (e.g., Fintech, HealthTech) |
| **submissionWindow** | Start and end dates for accepting ideas |
| **eligibility** | Criteria determining who can apply (e.g., region, stage, industry) |
| **reward** | Information on prizes, funding, or other incentives |
| **tags** | Keywords for better search and categorization |
| **maxSubmissions** | Maximum number of submissions allowed per applicant |
| **reviewPanel** | IDs or names of judges/mentors involved in evaluating submissions |
| **guidelinesLink** | URL to guidelines and templates |
| **promotionalMedia** | Media links or banners for promotional use |
| **status** | Current state (Draft, Active, Closed, Archived) |
| **createdBy** | Admin user ID who created the call |
| **createdAt** | Timestamp of creation |



### Event Model

| Field | Description |
| --- | --- |
| id | Unique identifier |
| title | Event title |
| description | Event details |
| date | Scheduled date |
| relatedCallId | Startup call associated with the event (nullable) |
| createdAt | Timestamp |


API Endpoints
-------------

### Startup Calls

| Method | Endpoint | Description | Auth Role |
| --- | --- | --- | --- |
| POST | /calls | Create a new startup call | Admin |
| GET | /calls | Retrieve all active startup calls | Public |
| GET | /calls/{id} | Retrieve details of a specific startup call | Public |
| PUT | /calls/{id} | Update an existing startup call | Admin |
| DELETE | /calls/{id} | Delete/archive a startup call | Admin |


### Events Calendar

| Method | Endpoint | Description | Auth Role |
| --- | --- | --- | --- |
| POST | /events | Create a new event | Admin |
| GET | /events | Retrieve all events | Public |
| GET | /events/{id} | Retrieve details of a specific event | Public |
| PUT | /events/{id} | Update event details | Admin |
| DELETE | /events/{id} | Delete an event | Admin |


Dependencies
------------

-   **Authentication & User Management Service**
    -   JWT token validation for all secured endpoints.
    -   Role verification to ensure only Admins can create or manage startup calls/events.


Database
--------

A dedicated PostgreSQL database for this service, containing:

-   `StartupCalls` table
-   `Events` table

Each table includes standard fields such as IDs, timestamps, and foreign keys where necessary.


Interactions with Other Services
--------------------------------

1.  **Idea Submission Service**

    -   Reads active startup calls to allow entrepreneurs to submit ideas under specific calls.
2.  **Notification Service (Optional)**

    -   Sends notifications to users about new startup calls or upcoming events.
3.  **Reporting & Analytics Service**

    -   Pulls data on startup calls, submission windows, and event engagement to generate performance reports.


Security & Access Control
-------------------------

-   All public endpoints (GET /calls, GET /events) are accessible without authentication.
-   Management endpoints (POST, PUT, DELETE) require a valid JWT token and the Admin role.
-   OAuth 2.0-based authentication is handled by the Auth Service, this service only verifies tokens and user roles.


Future Enhancements
-------------------

-   **Third-Party API Integrations:**
    -   Direct social media API integration for automatic promotional postings.
-   **Call Templates:**
    -   Allow predefined templates for frequently repeated startup calls.
-   **Advanced Event Notifications:**
    -   Schedule automatic reminders for key event dates via Notification Service.


Summary
-------

The **Startup Call Management Service** is a vital backbone of the Startup Management System, ensuring structured, well-promoted, and well-managed startup call campaigns. By cleanly separating the creation, management, and promotion of calls and related events, it simplifies the process for both administrators and applicants, while also integrating seamlessly with other system modules.
