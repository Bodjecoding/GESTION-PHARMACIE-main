import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
  useUpdateContactMutation,
  useGetContactByIdQuery,
} from '../../api/contact';

const EditContactPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    profession: '',
  });

  const { data: contact } = useGetContactByIdQuery(id, { skip: !id });
  const [updateContact, { isLoading, isError, error }] = useUpdateContactMutation();
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        email: contact.email || '',
        address: contact.address || '',
        phone: contact.phone || '',
        profession: contact.profession || '',
      });
    }
  }, [contact]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateContact({ id, updatedData: formData });

      if (response.error) {
        console.error('Erreur lors de la mise à jour du contact:', response.error);
      } else {
        // Affichez le message de succès
        setSuccessMessage('Contact mis à jour avec succès');

        // Redirigez après 2 secondes
        setTimeout(() => {
          window.location.href = '/dashboard/Contacts';
        }, 2000);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du contact:', error);
    }};


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-50 shadow-lg p-8 rounded-lg w-2/3">
      {successMessage && (
          <div className="bg-green-500 text-white p-2 rounded-md text-center mb-4">
            {successMessage}
          </div>
        )}
        <h1 className=" bg-white shadow-lg rounded-lg text-2xl font-semibold mb-10 pb-4 pt-4 text-center">Modification du Contact</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-sm font-semibold">
                Prénom
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-sm font-semibold">
                Nom
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="address" className="text-sm font-semibold">
                Adresse
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm font-semibold">
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="profession" className="text-sm font-semibold">
                Profession
              </label>
              <input
                type="text"
                name="profession"
                id="profession"
                value={formData.profession}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className={`${
                isLoading ? 'disabled bg-green-100' : ''
              } bg-green-500 text-white px-4 py-2 rounded-md`}
            >
              {isLoading ? (
                <>
                  <span className="mr-2">Mise à jour en cours...</span>
                  <FontAwesomeIcon icon={faSpinner} spin />
                </>
              ) : (
                'Mise à jour du contact'
              )}
            </button>
            <Link
              to="/dashboard/Contacts"
              className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContactPage;
