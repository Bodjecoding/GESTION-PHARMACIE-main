import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLoginMutation } from "../../api/auth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("vous devez entrer un email valide")
    .required("L\"email est obligatoir"),
  password: yup
    .string()
    .min(3, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est obligatoire"),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
    const navigate = useNavigate();
    const [login, { isLoading, isSuccess, isError, error,data }] = useLoginMutation();
    useEffect(() => {
        if (isSuccess) {
        localStorage.setItem("user", JSON.stringify(data));
        console.log(data);
        navigate("/dashboard");
        }
    }, [isSuccess]);
    
  

  const onSubmit = (data) => {
    login(data);
  };
  console.log("errors: ", errors);
  console.log("error in request: ", error);
  return (
    <div className="md:grid md:grid-cols-2 items-center w-full min-h-screen">
      <div className="pr-4 border-r-2 ma border-green-500">
        <img className="" src="/src/assets/images/Login.png" alt="" />
      </div>
      <div className="px-8 space-y-8">
        <h1 className="text-3xl font-bold ">Se connecter</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent "
              type="text"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              {...register("password")}
              className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent "
              type="password"
              placeholder="Mot de passe"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
            {isError && (
                <p className="text-red-500">{error.error}Identifiants invalides</p>
            )}
         <div className="text-center mt-4">
  <button
    type="submit"
    className={`${
      isLoading ? "disabled bg-green-100" : ""
    } bg-green-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-green-600`}
  >
    {isLoading ? (
                <>
                  <span className="mr-2">Connexion......</span>
                  <FontAwesomeIcon icon={faSpinner} spin />
                </>
              ) : (
                'Se connecter'
              )}
  </button>
  <p className="mt-2 text-gray-600">
    Vous n'avez pas encore de compte?{" "}
    <Link
      to="/register"
      className="text-green-500 hover:underline transition duration-300 ease-in-out"
    >
      Créez-en un !
    </Link>
  </p>
</div>

        </form>
      </div>
    </div>
  );
}
