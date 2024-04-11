
type HeaderProps = {
    toggleModal: (isActive: boolean) => void;
    numberOfContacts: number;
}

const Header = ({ toggleModal, numberOfContacts}: HeaderProps) => {
    return (
        <header className="header">
            <div className="container">
                <h3>Contact List ({numberOfContacts})</h3>
                <button onClick={() => toggleModal(true)} className="btn">
                    <i className="bi bi-plus-square"></i> Add New Contact
                </button>
            </div>
        </header>
    )
};

export default Header;
