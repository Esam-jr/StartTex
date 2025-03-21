Authentication & User Management Service
========================================

Overview
--------

The Authentication & User Management Service is the foundation of the Startup Management System. It handles all authentication processes, user registration, login, logout, and role management. It ensures that only authorized users (Entrepreneurs, Reviewers, Sponsors, Admins) can access and interact with the system according to their permissions.

Every other service within the system relies on this service to validate users and enforce access control. It uses OAuth to allow users to sign in with their existing accounts (such as Google, GitHub, LinkedIn) to speed up the process.


Functionalities
---------------

### OAuth-Based Authentication

Users can sign in using third-party OAuth providers like Google, GitHub, or LinkedIn. This reduces the need to create a new password and profile, allowing quick and secure onboarding. Upon successful login, the service generates a JWT (JSON Web Token) that contains the user's identity and role information.

Each OAuth provider has a dedicated callback endpoint that processes authentication responses and handles session creation.

### JWT Token Management

Once the user is authenticated, a JWT is issued. This token is used for all subsequent requests to identify the user and their role. The token is signed securely and includes expiration time to enhance security. It is validated by other microservices to ensure the legitimacy of user actions.

### Role-Based Access Control (RBAC)

Each user has a role assigned upon registration or by an admin. Available roles are:

-   Entrepreneur
-   Reviewer
-   Sponsor
-   Admin

Role-based access control ensures that:

-   Entrepreneurs can only submit ideas and view their own submissions.
-   Reviewers can only access submissions assigned to them.
-   Sponsors can access their own dashboard and financial data.
-   Admins can manage users, assign roles, and access all system data.

### User Profile Management

User profiles contain essential information like name, email, organization field, and role. Users can update their personal details, but role updates are restricted to admin users only.

The service also supports viewing and updating user profiles via secure endpoints, ensuring data integrity and privacy.


API Endpoints
-------------

### Authentication Routes:

-   `/auth/google`\
    Initiates Google OAuth login.

-   `/auth/google/callback`\
    Handles callback and token issuance.

-   `/auth/github`\
    Initiates GitHub OAuth login.

-   `/auth/github/callback`\
    Handles GitHub OAuth response.

-   `/auth/linkedin`\
    Initiates LinkedIn OAuth login.

-   `/auth/linkedin/callback`\
    Processes LinkedIn OAuth response.

-   `/auth/logout`\
    Logs out the user by invalidating their session or token.


### User Routes:

-   `/users/{id}`\
    Retrieves user profile based on ID. Restricted to the user or admin.

-   `/users/{id}` (PUT)\
    Updates user profile data. Only the profile owner or admin can perform updates.

-   `/users/{id}/roles` (PUT)\
    Updates user roles. Admin privileges required.


Communication with Other Services
---------------------------------

This service exposes a token verification utility used by all other microservices to authenticate incoming requests. They pass the JWT token in request headers, and this service decodes and verifies the token before allowing access to protected resources.

For example:

-   The **Idea Submission Service** checks if a user is logged in and has the role of Entrepreneur.
-   The **Sponsorship Service** verifies that the requesting user is a valid sponsor.
-   The **Admin Panel** depends on this service to enforce admin-only controls.


Security Measures
-----------------

1.  **OAuth Protocol** ensures safe third-party authentication.
2.  **JWT Tokens** are signed with a secret key, ensuring their integrity and making them tamper-proof.
3.  **Token Expiration** limits session duration, minimizing attack windows.
4.  **RBAC Policies** strictly control access to sensitive endpoints.
5.  **Input Sanitization & Validation** prevent malicious data injection.

