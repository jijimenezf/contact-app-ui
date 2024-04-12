/**
 * Declaration for Types
 */

export type Contact = {
    id: string;
    name: string;
    email: string | undefined;
    title: string | undefined;
    phone: string | undefined;
    address: string | undefined;
    status: "Active" | "Inactive";
    photoUrl?: string;
};

export type SaveContact = Omit<Contact, "id" | "photoUrl">;

export type PageRequest = {
    page?: number;
    size?: number;
};

export type ContactsResponse = {
    content: Contact[] | [];
    totalPages: number;
};

export type ContactListProps = {
    data: ContactsResponse;
    currentPage: number;
    fetchAllContacts: (pageReq: PageRequest) => Promise<void>;
};

export type ContactDetailProps = {
    updateContact: (contact: Contact) => Promise<void>;
    updateImage: (formData: FormData) => Promise<void>;
};

export const SIZE = 5;
