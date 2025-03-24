**Result Announcement & Notification Service**
==============================================

**Overview**
------------

The **Result Announcement & Notification Service** is a microservice designed to manage the dissemination of evaluation outcomes and other pertinent information to users within the Startup Management System. It ensures timely and organized communication of results to startups, reviewers, mentors, sponsors, and administrators.


**Core Functionalities**
------------------------

### 1\. **Result Publication**

-   Facilitates the posting of evaluation results for startup applications.

-   Supports various result statuses such as "Accepted," "Rejected," or "Waitlisted."

-   Allows administrators to schedule result announcements.

### 2\. **Notification Dispatch**

-   Sends notifications to users regarding result announcements and other updates.

-   Supports multiple channels, including email and in-app notifications.

-   Ensures notifications are delivered based on user preferences and roles.


**Interactions with Other Services**
------------------------------------

-   **Authentication & User Management Service**: Verifies user identities and retrieves contact information for notification delivery.

-   **Startup Call Management & Idea Evaluation Services**: Provides evaluation data necessary for result announcements.

-   **Communication & Collaboration Tools Service**: Integrates with messaging systems to deliver in-app notifications.


**Entities & Data Model**
-------------------------

### 1\. **Result**

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Unique identifier for each result |
| applicationId | UUID | ID of the associated startup application |
| status | String | Outcome status (e.g., "Accepted," "Rejected") |
| comments | Text | Additional feedback or remarks |
| publishedAt | DateTime | Timestamp of when the result was published |


### 2\. **Notification**

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Unique identifier for each notification |
| recipientId | UUID | User ID of the notification recipient |
| type | String | Notification type (e.g., "Result Announcement") |
| content | Text | Message content |
| channel | String | Delivery channel (e.g., "Email," "In-App") |
| sentAt | DateTime | Timestamp of when the notification was sent |
| readAt | DateTime | Timestamp of when the notification was read |

**API Endpoints**
-----------------

| Method | Endpoint | Description | Auth Role |
| --- | --- | --- | --- |
| POST | /results | Publish a new result | Admin |
| GET | /results/:applicationId | Retrieve result for a specific application | Admin, Reviewer |
| POST | /notifications | Send a new notification | Admin |
| GET | /notifications/:recipientId | Retrieve notifications for a specific user | Authenticated User |
| PUT | /notifications/:id/read | Mark a notification as read | Recipient |


**Access Control (Auth Roles)**
-------------------------------

-   **Admin**: Authorized to publish results and send notifications.

-   **Reviewer**: Can access evaluation results for applications they reviewed.

-   **Authenticated Users**: Can receive and read notifications pertinent to them.


**Key Workflows**
-----------------

1.  **Result Announcement Workflow**

    -   Admin publishes evaluation results → System stores result data → Notifications are generated for relevant users.

2.  **Notification Delivery Workflow**

    -   System retrieves user preferences and contact information → Sends notifications via specified channels → Records delivery status.

3.  **Notification Acknowledgment Workflow**

    -   User receives notification → Reads content → System updates notification status to "Read."


**Conclusion**
--------------

The **Result Announcement & Notification Service** streamlines the communication of evaluation outcomes and important updates within the Startup Management System, ensuring stakeholders are informed promptly and efficiently.
