import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../utils/ToastService";
import { type Contact, ContactDetailProps } from "../utils/types";

const ContactDetail = ({ updateContact, updateImage }: ContactDetailProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [currentContact, setCurrentContact] = useState<Contact>({
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: 'Inactive',
        photoUrl: ''
    });
    const { id } = useParams();

    const selectImage = () => {
        inputRef.current?.click();
    };

    /*const updatePhoto = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            // @ts-expect-error ignore at the moment
            formData.append('id', id);
            await updateImage(formData);
            setCurrentContact(prev => ({...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}`}));
            toastSuccess("Photo updated");
        } catch (err) {
            console.log("There is an error when uploading the image " + err);
            if (err instanceof Error) {
                toastError(err.message);
            }
            
        }
    };*/

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentContact({...currentContact, [event.target.name]: event.target.value });
    };

    const onUpdateContact = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await updateContact(currentContact);
        //fetch
        toastSuccess("Contact Updated");
    }

    const handleChangePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            toastError("No image file was attached");
          return;
        }
        try {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file, file.name);
            // @ts-ignore
            formData.append('id', id);
            await updateImage(formData);
            setCurrentContact(prev => ({...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}`}));
            toastSuccess("Photo updated");
        } catch (err) {
            console.log("There is an error when uploading the image " + err);
            if (err instanceof Error) {
                toastError(err.message);
            }
            
        }
    }

    return (
        <>
          <Link to={'/contacts'} className="link"><i className="bi bi-arrow-left"></i> Back to List</Link>
          <div className="profile">
            <div className="profile__details">
                <img src={currentContact.photoUrl} alt={`Profile photo of ${currentContact.name}`} />
                <div className="profile__metadata">
                    <p className="profile__name">{currentContact.name}</p>
                    <p className="profile__muted">JPG, PNG or GIF. Max size of 10 MB</p>
                    <button onClick={selectImage} className="btn">
                        <i className="bi bi-cloud-upload"></i>
                         Change photo
                    </button>
                </div>
            </div>
            <div className="profile__settings">
                <div>
                    <form className="form" onSubmit={onUpdateContact}>
                        <div className="user-details">
                            <input type="hidden" defaultValue={currentContact.id} name="id" required />
                            <div className="input-box">
                                <span className="details">Name</span>
                                <input
                                  type="text"
                                  value={currentContact.name}
                                  onChange={onChange}
                                  name="name"
                                  required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input
                                  type="text"
                                  value={currentContact.email}
                                  onChange={onChange}
                                  name="email"
                                  required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Phone</span>
                                <input
                                  type="text"
                                  value={currentContact.phone}
                                  onChange={onChange}
                                  name="phone"
                                  required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Address</span>
                                <input
                                  type="text"
                                  value={currentContact.address}
                                  onChange={onChange}
                                  name="address"
                                  required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Title</span>
                                <input
                                  type="text"
                                  value={currentContact.title}
                                  onChange={onChange}
                                  name="title"
                                  required
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Status</span>
                                <input
                                  type="text"
                                  value={currentContact.status}
                                  onChange={onChange}
                                  name="status"
                                  required
                                />
                            </div>
                            { /*
                            <input
                                id="file"
                                name="file"
                                accept="image/*"
                                type="file"
                            />
                            */ }
                            
                            <div className="form-footer">
                                <button type="submit" className="btn">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
          </div>

          <form style={{ display: 'none' }}>
            <input
              type="file"
              ref={inputRef}
              onChange={handleChangePhoto}
              name="file"
              accept="image/*" />
          </form>
        </>
    )
};

export default ContactDetail;
