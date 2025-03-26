/**
 * @swagger
 * components:
 *   schemas:
 *     StartupCall:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the startup call
 *         startupId:
 *           type: string
 *           description: ID of the startup associated with the call
 *         callDate:
 *           type: string
 *           format: date-time
 *           description: Date and time of the call
 *         notes:
 *           type: string
 *           description: Additional notes about the call
 *         status:
 *           type: string
 *           enum: [scheduled, completed, cancelled]
 *           description: Current status of the call
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the record was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the record was last updated
 *       required:
 *         - startupId
 *         - callDate
 *         - status
 *
 *     StartupCallInput:
 *       type: object
 *       properties:
 *         startupId:
 *           type: string
 *           description: ID of the startup associated with the call
 *         callDate:
 *           type: string
 *           format: date-time
 *           description: Date and time of the call
 *         notes:
 *           type: string
 *           description: Additional notes about the call
 *         status:
 *           type: string
 *           enum: [scheduled, completed, cancelled]
 *           description: Current status of the call
 *       required:
 *         - startupId
 *         - callDate
 *         - status
 *
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the event
 *         title:
 *           type: string
 *           description: Title of the event
 *         description:
 *           type: string
 *           description: Detailed description of the event
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date and time of the event
 *         related_call_id:
 *           type: string
 *           format: uuid
 *           description: ID of the related startup call (if any)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the record was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the record was last updated
 *       required:
 *         - title
 *         - description
 *         - date
 *
 *     EventInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the event
 *         description:
 *           type: string
 *           description: Detailed description of the event
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date and time of the event
 *         related_call_id:
 *           type: string
 *           format: uuid
 *           description: ID of the related startup call (if any)
 *       required:
 *         - title
 *         - description
 *         - date
 */
