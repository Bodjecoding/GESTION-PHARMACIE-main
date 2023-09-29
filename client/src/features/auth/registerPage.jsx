import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRegisterMutation } from "../../api/auth"; // Assurez-vous d'avoir une mutation `useRegisterMutation` pour l'enregistrement
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const schema = yup.object().shape({
  firstName: yup.string().required("Le prénom est obligatoire"),
  lastName: yup.string().required("Le nom de famille est obligatoire"),
  email: yup
    .string()
    .email("Veuillez entrer une adresse e-mail valide")
    .required("L'e-mail est obligatoire"),
  password: yup
    .string()
    .min(5, "Le mot de passe doit contenir au moins 5 caractères")
    .required("Le mot de passe est obligatoire"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Les mots de passe doivent correspondre")
    .required("La confirmation du mot de passe est obligatoire"),
});

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [registerUser, { isLoading, isSuccess, isError, error, data }] = useRegisterMutation();
  useEffect(() => {
      if (isSuccess) {
        localStorage.setItem("user", JSON.stringify(data));
        console.log(data);        
      navigate("/dashboard");
      }
  }, [isSuccess]);

  const onSubmit = (data) => {
    registerUser(data); // Utilisez la mutation pour enregistrer l'utilisateur
  };

  return (
    <div className="md:grid md:grid-cols-2 items-center w-full min-h-screen">
      <div className="pr-4 border-r-2 ma border-green-500">
        <img className="" src="/src/assets/images/Signup.png" alt="" />
      </div>
      <div className="px-8 space-y-8">
        <h1 className="text-3xl font-bold">Créer un compte</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              {...register("firstName")}
              className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              type="text"
              placeholder="Prénom"
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nom de famille</label>
            <input
              {...register("lastName")}
              className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              type="text"
              placeholder="Nom de famille"
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email")}
              className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              type="text"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              {...register("password")}
              className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              type="password"
              placeholder="Mot de passe"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Confirmation du mot de passe</label>
            <input
              {...register("confirmPassword")}
              className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              type="password"
              placeholder="Confirmation du mot de passe"
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          </div>
          {isError && <p className="text-red-500">{error.error}</p>}
          <button
            type="submit"
            className={`${isLoading ? 'disabled bg-green-100' : ''} bg-green-500 text-green-50 px-4 py-2 rounded-md`}
          >
            {isLoading ? (
                <>
                  <span className="mr-2">Enregistrement en cours...</span>
                  <FontAwesomeIcon icon={faSpinner} spin />
                </>
              ) : (
                "S'inscrire"
              )}
          </button>
          <p className="mt-2 text-gray-600">
              Vous avez déjà un compte?{" "}
              <Link
                  to="/login"
                  className="text-green-500 hover:underline transition duration-300 ease-in-out"
           >
               Connectez-vous !
    </Link>
  </p>
          
        </form>
      </div>
    </div>
  );
}
