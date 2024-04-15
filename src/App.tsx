import { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ContactDetail from "./components/ContactDetail";
import { toastError } from "./utils/ToastService";
import { ToastContainer } from "react-toastify";

import {
  type PageRequest,
  ContactsResponse,
  Contact,
  SIZE,
  SaveContact,
} from "./utils/types";
import {
  getAllContacts,
  saveContact,
  updatePhoto,
  updateContact,
} from "./utils/ContactService";

function App() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<ContactsResponse>({
    content: [],
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState<File>();
  const [values, setValues] = useState<SaveContact>({
    name: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    status: "Active",
  });

  const fetchContacts = async ({ page = 0, size = SIZE }: PageRequest) => {
    try {
      setCurrentPage(page);
      const { data } = await getAllContacts({ page, size });
      setData(data);
    } catch (err) {
      console.log("There was an error getting the contacts " + err);
      if (err instanceof Error) {
        toastError(err.message);
      }
    }
  };

  const toggleModal = (show: boolean) =>
    show ? modalRef.current?.showModal() : modalRef.current?.close();

  const onUpdateContact = async (contact: Contact) => {
    try {
      const { data } =  await updateContact(contact);
      return data;
    } catch (err) {
      console.log("There was an error saving the contact " + err);
      if (err instanceof Error) {
        toastError(err.message);
      }
    }
  };

  const updateImage = async (formData: FormData) => {
    try {
      const { data } = await updatePhoto(formData);
      return data;
    } catch (err) {
      console.log("There was an error uploading the image " + err);
      if (err instanceof Error) {
        toastError(err.message);
      }
    }
  };

  useEffect(() => {
    fetchContacts({});
  }, []);

  /**
   * Function that updates any inpt in the form and reflects the value in the state of this component
   * @param event includes the name of the field and the value that would be updated in the state
   */
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  /**
   * Update the file used in the profile of the contact
   * @param e React event
   * @returns in case there is no file attached in the corresponding field
   */
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      toastError("No image file was attached");
      return;
    }
    try {
      setFile(e.target.files[0]);
    } catch (err) {
      console.log("There is an error when uploading the image " + err);
      if (err instanceof Error) {
        toastError(err.message);
      }
    }
  };

  /**
   * Submits the changes in the form in order to update the information for the contact
   * using the RESTful operation defined for that and reloads the info for the same contact
   * @param event React event
   */
  const onSubmitNewContact = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const { data } = await saveContact(values);
      const formData = new FormData();
      formData.append("id", data.id);
      // @ts-expect-error ignore
      formData.append("file", file, file.name);
      await updatePhoto(formData);
      toggleModal(false);
      setFile(undefined);
      // @ts-expect-error ignore
      fileRef.current.value = null;
      setValues({
        name: "",
        email: "",
        phone: "",
        address: "",
        title: "",
        status: "Inactive",
      });
      fetchContacts({});
    } catch (err) {
      console.log("There is an error saving the new contact " + err);
      if (err instanceof Error) {
        toastError(err.message);
      }
    }
  };

  return (
    <BrowserRouter>
      <Header
        toggleModal={toggleModal}
        numberOfContacts={data?.content.length ?? 0}
      />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to={"/contacts"} />} />
            <Route
              path="/contacts"
              element={
                <ContactList
                  data={data}
                  currentPage={currentPage}
                  fetchAllContacts={fetchContacts}
                />
              }
            />
            <Route
              path="/contacts/:id"
              element={
                <ContactDetail
                  updateContact={onUpdateContact}
                  updateImage={updateImage}
                />
              }
            />
          </Routes>
        </div>
      </main>

      {/* Modal */}
      <dialog id="modal" ref={modalRef} className="modal">
        <div className="modal__header">
          <h3>New Contact</h3>
          <i className="bi bi-x-large" onClick={() => toggleModal(false)}></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={onSubmitNewContact}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input
                  type="text"
                  value={values.name}
                  onChange={onChange}
                  name="name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  value={values.email}
                  onChange={onChange}
                  name="email"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input
                  type="text"
                  value={values.title}
                  onChange={onChange}
                  name="title"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  value={values.phone}
                  onChange={onChange}
                  name="phone"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input
                  type="text"
                  value={values.address}
                  onChange={onChange}
                  name="address"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Account Status</span>
                <input
                  type="text"
                  value={values.status}
                  onChange={onChange}
                  name="status"
                  required
                />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input
                  type="file"
                  onChange={handleUploadFile}
                  ref={fileRef}
                  name="photo"
                  required
                />
              </div>
            </div>

            <div className="form-footer">
              <button
                onClick={() => toggleModal(false)}
                type="button"
                className="btn btn-danger"
              >
                Cancel
              </button>
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
