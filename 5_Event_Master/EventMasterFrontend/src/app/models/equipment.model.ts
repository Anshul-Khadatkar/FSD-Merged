export interface Equipment {
  id?: number;
  name: string;
  eventName: string;
  description: string;
  category: string;
  quantity: number;
  condition: string;
  costPerUnit: number;
  location: string;
  status: string;
  lastMaintenance: Date | string;
  nextMaintenance: Date | string;
}