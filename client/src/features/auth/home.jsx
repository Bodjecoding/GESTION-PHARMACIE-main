import React from "react";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Présentation de l'application */}
      <section className="bg-white text-green-500 py-1 flex">
        <div className="w-1/2 text-center rounded-sm bg-gray-100 mt-20 ml-5 py-12 mb-20">
          <h1 className="text-7xl font-bold mb-4">
            Bienvenue
          </h1>
          <h2 className="text-black text-lg mt-10 mb-6">
            Félicitations pour avoir terminé avec succès notre formation en développement full-stack offerte par Orange Digital Center. Vous êtes maintenant prêt(e) à plonger dans le monde de la gestion de contacts grâce à notre application de pointe. Laissez-nous vous accompagner dans l'organisation de vos relations, simplifiant ainsi votre vie professionnelle.
          </h2>

          <Link
            to="/login"
            className="bg-green-500 text-white hover:bg-green-800 font-bold py-2 px-10 mt-18 rounded-lg inline-block"
          >
            Démarrer
          </Link>
        </div>

        <div className="w-5/6">
          {/* Ajoutez ici votre image d'illustration */}
          <img
            src="/src/assets/images/home.png"
            alt="Illustration"
            className="w-full"
          />
        </div>
      </section>

      {/* Présentation d'Orange Digital Center */}
<section className="bg-gray-100 py-16 flex">
  <div className="w-1/2 flex justify-center items-center">
    {/* Logo d'Orange Digital Center */}
    <img
      src="/src/assets/images/logo-orange.png"
      alt="Logo Orange Digital Center"
      className="w-60 h-auto mr-5"
    />
    <img
      src="/src/assets/images/odc.webp"
      alt="Logo Orange Digital Center"
      className="w-80 h-auto"
    />
  </div>
  <div className="w-1/2 mt-0 ml-0">
    <div className="bg-white p-4 ml-10 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">Orange Digital Center</h2>
      <p className="text-gray-600 mb-4">
        Orange Digital Center est une division de Orange qui offre des
        opportunités de développement professionnel notament dans le domaine du
        développement web et de la technologie et dans d'autres domaines . Nous tenons à exprimer notre
        gratitude envers Orange Digital Center pour leur engagement dans la
        formation et le développement des talents.
      </p>
      <p className="text-gray-600 mb-4">
        Merci pour cette opportunité qui nous a permis d'acquérir des
        compétences essentielles en développement full-stack, et nous sommes
        impatients de mettre en pratique ce que nous avons appris.
      </p>
    </div>
  </div>
</section>


      <section className="bg-gray-100 py-16">
        <h2 className="text-2xl font-bold text-center mb-4">Membres du groupe</h2>
        <div className="flex justify-center">
          {/* Membre 1 */}
          <div className="bg-white p-2 rounded-lg shadow-md mx-4">
            <img
              src="/src/assets/images/lama.jpg"
              alt="Membre 1"
              className="w-60 h-100 rounded-full mb-4 mx-auto"
            />
            <h2 className="text-lg font-bold text-center">Chef de groupe</h2>
            <h3 className="text-lg font-semibold text-center">El Mamadou Lamarana Barry</h3>
            <p className="text-gray-600 text-center">Etudiant en L2 licence informatique à Gamal</p>
          </div>

          <div className="bg-white p-2 rounded-lg shadow-md mx-4">
            <img
              src="/src/assets/images/cherif.jpg"
              alt="Membre 1"
              className="w-60 h-80 rounded-full mb-4 mx-auto"
            />
            <h3 className="text-lg font-semibold text-center">El Mamadou Lamarana Barry</h3>
            <p className="text-gray-600 text-center">Etudiant en L2 licence informatique à Gamal</p>
          </div>

          {/* Membre 2 */}
          <div className="bg-white p-2 rounded-lg shadow-md mx-4">
            <img
              src="/src/assets/images/mamadou.jpg"
              alt="Membre 1"
              className="w-60 h-80 rounded-full mb-4 mx-auto"
            />
            <h3 className="text-lg font-semibold text-center">El Mamadou Lamarana Barry</h3>
            <p className="text-gray-600 text-center">Etudiant en L2 licence informatique à Gamal</p>
          </div>

          {/* Membre 3 */}


          {/* Membre 4 */}
          <div className="bg-white p-2 rounded-lg shadow-md mx-4">
            <img
              src="/src/assets/images/souleymane.jpg"
              alt="Membre 1"
              className="w-60 h-80 rounded-full mb-4 mx-auto"
            />
            <h3 className="text-lg font-semibold text-center">El Mamadou Lamarana Barry</h3>
            <p className="text-gray-600 text-center">Etudiant en L2 licence informatique à Gamal</p>
          </div>
        </div>
      </section>

      {/* Présentation du professeur */}
      {/* Présentation du professeur */}
      <section className="bg-gray-200 py-16 flex">
        <div className="w-1/2 flex justify-center items-center">
          <img
            src="/src/assets/images/prof.jpeg"
            alt="Professeur"
            className="w-100 h-100 rounded-full mb-4 mr-0"
          />
        </div>
        <div className="w-1/2 mt-20 ml-0">
          <div className="bg-white p-4 mr-10 rounded-lg shadow-md ">
            <h2 className="text-3xl font-bold mb-4">Formateur</h2>
            <h3 className="text-2xl font-semibold">Mamadou Alpha Baldé</h3>
            <p className="text-gray-600 mb-10">Full-Stack JS developer #React, #Next, #Nodejs, #Express, #Mongodb, #Prisma</p>
            <a className="text-white bg-green-500 hover:bg-green-700 rounded-lg px-10 py-2 mt-10" href="https://github.com/korbonya">Github</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-500 text-white text-center py-4">
        © 2023 Tous droits réservés | Formation dev full stack Groupe 2
      </footer>
    </div>
  );
}


