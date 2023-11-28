import { useContext } from "react";
import { AuthContext } from "../../../auth provider/AuthProvider";

const useAuth = () => {
    const authInfo = useContext(AuthContext);
    return authInfo;
};

export default useAuth;