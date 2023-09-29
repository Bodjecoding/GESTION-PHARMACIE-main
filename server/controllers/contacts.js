import Contact from "../models/contacts.js";
import mongoose from "mongoose";


// Controller pour creer un contact 
export const createContact = async (req, res) => {
    const contact = req.body;

    const newContact = new Contact({ ...contact, userId: req.user.id });
    try {
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Controller pour trouver un utilisteur par son id
export const getContactById = async (req, res) => {
  const id = req.params.id;
  try {
    const contact = await Contact.findById(id);
    res.json(contact);
    
  } catch (error) {
    res.status(409).json({ message: error.message }); 
  }
}

// controller pour afficher les contacts par utilisateur
export const getContactsByUser = async (req, res) => {
    try {
        // L'ID de l'utilisateur est extrait du token JWT dans le middleware protect
        const userId = req.user.id;

        // Recherchez tous les contacts associés à l'ID de l'utilisateur spécifié
        const contacts = await Contact.find({ userId: userId });

        // Vérifiez si des contacts ont été trouvés
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "Aucun contact trouvé pour cet utilisateur." });
        }

        // Si des contacts ont été trouvés, renvoyez-les en tant que réponse
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Controller pour modifier et mettre a jour un contact
export const updateContact = async (req, res) => {
    const { id } = req.params;
    const contact = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`Un contact n'existe pas dans la base avec cet ID: ${id}`);
    }
  
    try {
      // Récupérez l'ID de l'utilisateur à partir du token
      const userIdFromToken = req.user.id;
  
      // Recherchez le contact dans la base de données
      const existingContact = await Contact.findById(id);
  
      // Vérifiez si le contact existe
      if (!existingContact) {
        return res.status(404).json({ message: `Pas de contact trouvé avec cet ID: ${id}` });
      }
  
      // Vérifiez si l'utilisateur connecté est l'auteur du contact
      if (existingContact.userId.toString() !== userIdFromToken) {
        return res.status(403).json({ message: "Vous n'êtes pas autorisé à editer ce contact ." });
      }
  
      // Mettez à jour le contact
      const updatedContact = await Contact.findByIdAndUpdate(id, { ...contact }, { new: true });
  
      // Répondez avec le contact mis à jour 
      res.status(200).json({ message: "Contact mis à jour avec succès", updatedContact });  

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Controller pour supprimer un contact 
export const deleteContact = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`Un contact n'existe pas dans la base avec cet ID: ${id}`);
    }

    try {
        // Récupérez l'ID de l'utilisateur à partir du token
        const userIdFromToken = req.user.id;
    
        // Recherchez le contact dans la base de données
        const existingContact = await Contact.findById(id);
    
        // Vérifiez si le contact existe
        if (!existingContact) {
          return res.status(404).json({ message: `Pas de contact trouvé avec cet ID: ${id}` });
        }
    
        // Vérifiez si l'utilisateur connecté est l'auteur du contact
        if (existingContact.userId.toString() !== userIdFromToken) {
          return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer ce contact ." });
        }
    
        // Supprimer le contact
        await Contact.findByIdAndRemove(id);
        res.json({ message: "Contact supprimer avec succès." });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

// Contrôleur pour compter le nombre de contacts par utilisateur connecté
export const countContactsByUser = async (req, res) => {
  try {
    // Récupérez l'ID de l'utilisateur à partir du token
    const userId = req.user.id;

    // Utilisez la méthode countDocuments de Mongoose pour compter les contacts associés à l'ID de l'utilisateur
    const count = await Contact.countDocuments({ userId: userId });

    // Répondez avec le nombre de contacts comptés
    res.status(200).json({count});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

