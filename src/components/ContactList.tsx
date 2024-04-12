import Contact from "./Contact";
import { type ContactListProps } from "../utils/types";

const ContactList = ({
  data,
  currentPage,
  fetchAllContacts,
}: ContactListProps) => {
  return (
    <main className="main">
      {data.content.length === 0 ? (
        <div>No Contacts</div>
      ) : (
        <>
          <ul>
            {data.content.map((item) => (
              <Contact key={item.id} contact={item} />
            ))}
          </ul>

          {data.totalPages > 1 ? (
            <div className="pagination">
              <a
                onClick={() =>
                  fetchAllContacts({
                    page: currentPage - 1,
                  })
                }
                className={0 === currentPage ? "disabled" : ""}
              >
                &laquo;
              </a>
              {/* Number of pages */}
              {[...Array(data.totalPages).keys()].map((page, index) => (
                <a
                  key={`PAGE_${page}_${index}`}
                  onClick={() =>
                    fetchAllContacts({
                      page,
                    })
                  }
                  className={currentPage === page ? "active" : ""}
                >
                  {page + 1}
                </a>
              ))}
              <a
                onClick={() =>
                  fetchAllContacts({
                    page: currentPage + 1,
                  })
                }
                className={
                  data.totalPages === currentPage + 1 ? "disabled" : ""
                }
              >
                &raquo;
              </a>
            </div>
          ) : null}
        </>
      )}
    </main>
  );
};

export default ContactList;
