export interface Event {
  id?: number;        // ✅ Add this for Angular frontend consistency  
  eventId?: number;   // Keep this for backend compatibility
  eventName: string;
  eventType: string;
  eventHead: number;
  eventDay: string;
}
