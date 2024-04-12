import axios from "axios";
import { type Contact, PageRequest, ContactsResponse, SaveContact } from "./types";

const API_URL = "http://localhost:8080/contacts";
const HEADERS = {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
};

export async function saveContact(contact: SaveContact) {
    return await axios.post<Contact>(API_URL, contact, HEADERS);
}

export async function getAllContacts({ page, size }: PageRequest) {
    return await axios.get<ContactsResponse>(`${API_URL}?page=${page}&size=${size}`, HEADERS);
}

export async function getContact(id: string) {
    return await axios.get<Contact>(`${API_URL}/${id}`, HEADERS);
}

export async function updateContact(contact: Contact) {
    // the contact must contain an id. API post is able to determine if it's either a new record or an update
    return await axios.post(API_URL, contact, HEADERS);
}

export async function updatePhoto(formData: FormData) {
    return await axios.put<string>(`${API_URL}/photo`, formData);
}

export async function deleteContact(id: string) {
    return await axios.delete(`${API_URL}/${id}`)
}
