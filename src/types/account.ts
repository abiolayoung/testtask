export type AccountLabel = {
  text: string;
};

export type AccountType = 'LDAP' | 'Локальная';

export interface Account {
  id: string;
  labels: AccountLabel[];
  type: AccountType;
  login: string;
  password: string | null;
}

export interface ValidationErrors {
  login?: boolean;
  password?: boolean;
}