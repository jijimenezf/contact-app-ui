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
    photoUrl: string | undefined;
};

export type CreateUserResponse = {
    path: string;
};

export type PageRequest = {
    page?: number;
    size?: number;
};

export type ContactRespose = {
    content: Contact[] | [];
    totalPages: number;
};

export type ContactListProps = {
    data: ContactRespose;
    currentPage: number;
    getAllContacts: (pageReq: PageRequest) => ContactRespose;
};

export type ContactDetailProps = {
    updateContact: (contact: Contact) => Promise<void>;
    updateImage: (formData: FormData) => Promise<void>;
};
