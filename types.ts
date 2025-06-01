
export interface SafetyTip {
  id: number;
  category: string;
  tip: string;
  source?: string; // Optional: if tips are attributed
}

// Example of an enum if needed for other features, adhering to guidelines
export enum UserRole {
  GUEST = "GUEST",
  HOST = "HOST",
  ADMIN = "ADMIN",
}
