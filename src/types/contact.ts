export type ContactType = 'general' | 'project' | 'template' | 'material' | string;

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  type?: ContactType;
  subject?: string;
  targetTitle?: string;
  targetCode?: string;
  targetCategory?: string;
  targetImage?: string;
  targetUrl?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactDto {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type?: ContactType;
  subject?: string;
  targetTitle?: string;
  targetCode?: string;
  targetCategory?: string;
  targetImage?: string;
  targetUrl?: string;
}

export interface CreateContactResponse {
  message: string;
  contact: Contact;
  emailSent: boolean;
}

export interface DeleteContactResponse {
  message: string;
}

