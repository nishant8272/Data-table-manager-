export interface TableRow {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  department?: string;
  location?: string;
  [key: string]: string | number | undefined; // Dynamic fields
}

export interface TableColumn {
  id: string;
  label: string;
  visible: boolean;
  sortable: boolean;
  editable: boolean;
  type: 'text' | 'number' | 'email' | 'select';
  options?: string[]; // For select type
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: string | null;
  direction: SortDirection;
}