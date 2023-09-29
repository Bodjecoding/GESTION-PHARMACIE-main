import User from "../models/user.js";
import Yup from "Yup";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ...

export const register = async (req, res) => {
  const { lastName, firstName, email, password } = req.body;

  // Validation des données de l'utilisateur avec Yup (exigences de validation)
  const userSchema = Yup.object().shape({
      lastName: Yup.string().required(),
      firstName: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(3).required(), // Exemple : mot de passe d'au moins 3 caractères
  });

  try {
      // Valider les données de l'utilisateur
      await userSchema.validate(req.body);

      // Vérifier si l'utilisateur existe déjà
      const userExists = await User.findOne({ email });
      if (userExists) {
          return res.status(400).json({ message: "Un utilisateur avec cette adresse e-mail existe déjà." });
      }
      // Hasher le mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Créer un nouvel utilisateur
      const newUser = new User({
          lastName,
          firstName,
          email,
          password: hashedPassword,
      });

      // Enregistrer l'utilisateur dans la base de données
      await newUser.save();

      // Signer un token JWT pour le nouvel utilisateur
      const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "3h" });

      // Répondre avec succès et inclure le token dans la réponse
      res.status(201).json({ message: "Utilisateur créé avec succès", newUser, token });
  } catch (error) {
      // Gestion des erreurs
      res.status(400).json({ message: error.message });
  }
};

// login user

export const login = async (req, res) => {
  const { email, password } = req.body;
  // Rechercher l'utitilsateur dans la base de données
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  } else {
    // Verifier si le mot pass correspond
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      // Signer un token 
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "3h" });
      // Stocker l'utisateur et le token dans le localStorage
      res.status(200).json({ message: "Login successful", user, token });
    }

    
  }

};

export const countUsers = async (req, res) => {
  try {
    // Compter le nombre total d'utilisateurs dans la base de données
    const totalUsers = await User.countDocuments();

    // Répondre avec le nombre total d'utilisateurs
    res.status(200).json({ totalUsers });
  } catch (error) {
    // Gestion des erreurs
    res.status(500).json({ message: "Une erreur s'est produite lors du comptage des utilisateurs.", error: error.message });
  }
};

