import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSearch, faSpinner, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from "../../api/contact";

const ContactsPage = () => {
  const { data: contacts, isLoading, isError, error } = useGetContactsQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [sortOption, setSortOption] = useState("asc"); // Option de tri (asc, desc, date)
  const [showSortOptions, setShowSortOptions] = useState(false); // Affichage des options de tri

  const [deleteContact, { isError: deleteError, error: deleteErrorMessage }] = useDeleteContactMutation();

  useEffect(() => {
    if (contacts) {
      const sortedContacts = sortContacts(contacts, sortOption);
      setFilteredContacts(sortedContacts);
    }
  }, [contacts, sortOption]);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = contacts.filter((contact) => {
      const contactData = [
        contact.firstName.toLowerCase(),
        contact.lastName.toLowerCase(),
        contact.email.toLowerCase(),
        contact.address.toLowerCase(),
        contact.phone.toLowerCase(),
        contact.profession.toLowerCase(),
      ];

      const firstNameWords = contact.firstName.toLowerCase().split(' ');
      const firstNameMatch = firstNameWords.some((word) => word.includes(term));

      return (
        contactData.some((field) => field.includes(term)) || firstNameMatch
      );
    });

    setFilteredContacts(sortContacts(filtered, sortOption));
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
    setShowSortOptions(false);
  };

  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };

  const sortContacts = (contacts, option) => {
    const sortedContacts = [...contacts];

    if (option === "asc") {
      sortedContacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (option === "desc") {
      sortedContacts.sort((a, b) => b.firstName.localeCompare(a.firstName));
    } else if (option === "dateAsc") {
      sortedContacts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (option === "dateDesc") {
      sortedContacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return sortedContacts;
  };

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (contactToDelete) {
        await deleteContact(contactToDelete._id);
        const updatedContacts = contacts.filter(
          (contact) => contact._id !== contactToDelete._id
        );
        setFilteredContacts(sortContacts(updatedContacts, sortOption));
        setContactToDelete(null);
        setShowDeleteConfirmation(false);
        setShowSuccessMessage(true);

        // Fermer le message de succès après 3 secondes
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du contact:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h1 className="text-2xl font-semibold mb-4">Mes Contacts</h1>
      <div className="relative mb-4 flex items-center">
        <input
          type="text"
          placeholder="Rechercher un contact..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-5/6 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <span className="relative right-10 top-1 text-green-500">
          <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
        </span>
        <Link to="/addContact" className="hover:bg-green-400 bg-green-500 text-white px-4 py-2 rounded-md ml-2">Ajouter un contact</Link>
      </div>

      <div className="relative mb-4">
        <span className="text-gray-600">Trier par :</span>
        <button
          onClick={toggleSortOptions}
          className="ml-2 bg-gray-200 hover:bg-gray-300 rounded-md p-2"
        >
          {sortOption === "asc" ? (
            <>
              Prenom croissant{" "}
              {showSortOptions ? (
                <FontAwesomeIcon icon={faCaretUp} className="ml-1 text-gray-800" />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} className="ml-1 text-gray-800" />
              )}
            </>
          ) : sortOption === "desc" ? (
            <>
              Prenom décroissant{" "}
              {showSortOptions ? (
                <FontAwesomeIcon icon={faCaretUp} className="ml-1 text-gray-800" />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} className="ml-1 text-gray-800" />
              )}
            </>
          ) : sortOption === "dateAsc" ? (
            <>
              Du plus ancien au plus nouveau{" "}
              {showSortOptions ? (
                <FontAwesomeIcon icon={faCaretUp} className="ml-1 text-gray-800" />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} className="ml-1 text-gray-800" />
              )}
            </>
          ) : (
            <>
              Du plus nouveau au plus ancien{" "}
              {showSortOptions ? (
                <FontAwesomeIcon icon={faCaretUp} className="ml-1 text-gray-800" />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} className="ml-1 text-gray-800" />
              )}
            </>
          )}
        </button>
        {showSortOptions && (
          <div className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-md p-2 w-48">
            <label className="block">
              <input
                type="radio"
                value="asc"
                checked={sortOption === "asc"}
                onChange={() => handleSortOptionChange("asc")}
                className="mr-1"
              />
              Prenom croissant
            </label>
            <label className="block">
              <input
                type="radio"
                value="desc"
                checked={sortOption === "desc"}
                onChange={() => handleSortOptionChange("desc")}
                className="mr-1"
              />
              Prenom décroissant
            </label>
            <label className="block">
              <input
                type="radio"
                value="dateAsc"
                checked={sortOption === "dateAsc"}
                onChange={() => handleSortOptionChange("dateAsc")}
                className="mr-1"
              />
              Du plus ancien au plus nouveau 
            </label>
            <label className="block">
              <input
                type="radio"
                value="dateDesc"
                checked={sortOption === "dateDesc"}
                onChange={() => handleSortOptionChange("dateDesc")}
                className="mr-1"
              />
              Du plus nouveau au plus ancien 
            </label>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <span className="mr-2">Chargement des contacts en cours...</span>
          <FontAwesomeIcon icon={faSpinner} spin className="text-green-500 text-3xl" />
        </div>
      ) : (
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-green-500 text-lg text-white">
              <th className="text-left p-3">Prénom</th>
              <th className="text-left p-3">Nom</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Adresse</th>
              <th className="text-left p-3">Téléphone</th>
              <th className="text-left p-3">Profession</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact._id} className="bg-gray-100 hover:bg-gray-300 transition duration-300">
                <td className="p-3 font-semibold text-lg">{contact.firstName}</td>
                <td className="p-3 font-semibold text-lg">{contact.lastName}</td>
                <td className="p-3 font-semibold text-lg">{contact.email}</td>
                <td className="p-3 font-semibold text-lg">{contact.address}</td>
                <td className="p-3 font-semibold text-lg">{contact.phone}</td>
                <td className="p-3 font-semibold text-lg">{contact.profession}</td>
                <td className="p-3">
                  <Link to={`updateContact/${contact._id}`} className="text-blue-500 hover:text-blue-900">
                    <FontAwesomeIcon icon={faEdit} className="h-6 w-6" />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(contact)}
                    className="text-red-500 ml-2 hover:text-red-900"
                  >
                    <FontAwesomeIcon icon={faTrash} className="h-6 w-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Fenêtre modale de confirmation de suppression */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p>Etes vous sûr de vouloir supprimer le contact ?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-gray-500 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
              >
                Non
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white hover:bg-red-300 px-4 py-2 rounded-md"
              >
                Oui
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message de succès */}
      {showSuccessMessage && (
        <div className="fixed inset-x-0 top-20 z-50  bg-red-500 text-white p-2 text-center">
          Contact supprimé avec succès !
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
