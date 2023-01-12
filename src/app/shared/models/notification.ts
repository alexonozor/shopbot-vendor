export interface Notification {
    created: string;
    recipients: string[];
    _id: string;
    updated: string;
    userId: string;
    type: string;
    body: string;
    title: string;
    status: string;
}