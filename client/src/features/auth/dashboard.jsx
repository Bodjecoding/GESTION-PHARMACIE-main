import React, { useEffect, useState } from "react";
import { useCountQuery } from "../../api/auth";
import { useCountContactQuery } from "../../api/contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const userContacts = 250; // Remplacez par le nombre de contacts de l'utilisateur connecté
  const { data, isLoading, isSuccess, isError } = useCountQuery(); // Remplacez par la fonction appropriée depuis votre API
  const { data: dataCount, isLoading: isLoadingCount, isSuccess: isSuccessCount, isError: isErrorCount } = useCountContactQuery();

  return (
    <div>
      {/* Section pour le nombre total d'utilisateurs */}
      <section
        className="py-10 m-5 flex rounded-xl"
        style={{
          background: "linear-gradient(to right,#a2e0b9, #f0f0f0,#cccccc)",
        }}
      >
        <div className="w-1/2 mt-5">
          {/* Carte pour le nombre total d'utilisateurs */}
          <div className="bg-white p-4 rounded-lg w-2/3 ml-10 shadow-md">
            <h2 className="text-3xl font-bold mb-4">Nombre total d'utilisateurs</h2>
            {isLoading ? (
              <div className="text-center">
                <p className="text-2xl">Chargement en cours...</p>
                <FontAwesomeIcon icon={faSpinner} spin />
              </div>
            ) : (
              <p className="text-6xl text-center font-bold rounded-md pt-5 pb-5" style={{ background: "#a8e1bd" }}>
                {data?.totalUsers}
              </p>
            )}
          </div>
          {/* Carte pour le nombre de contacts de l'utilisateur connecté */}
          <div className="bg-white p-4 rounded-lg w-2/3 ml-10 mt-5 shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-center">Vos contacts enregistrés</h2>
            {isLoadingCount ? (
              <div className="text-center">
                <p className="text-2xl">Chargement en cours...</p>
                <FontAwesomeIcon icon={faSpinner} spin />
              </div>
            ) : (
              <p className="text-6xl text-white text-center font-bold rounded-md pt-5 pb-5" style={{ background: "#ff6581" }}>
                {dataCount?.count}
              </p>
            )}
          </div>
        </div>
        <div className="w-1/2 mr-5">
          {/* Illustration à droite */}
          <img
            src="/src/assets/images/stats1.png"
            alt="Illustration 1"
            className="w-full h-auto rounded-md"
          />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
