import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

/**
 * AuthProvider component wraps the app and provides authentication state.
 *
 * It checks for an existing session on mount and provides:
 * - `user`: the current user object or null
 * - `isAuthenticated`: boolean indicating if a user is logged in
 * - `login`: function to set user data
 * - `logout`: function to clear user data
 * - `loading`: boolean indicating if the session check is still in progress
 *
 * @author
 * 
 * @param {Object} props
 * @param {JSX.Element} props.children - The child components that need access to auth context
 * @returns {JSX.Element} Provider component wrapping the application
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to log user in (set user data)
  const login = (userData) => setUser(userData);

  // Function to log user out (clear user data)
  const logout = () => setUser(null);

  // Boolean indicating if a user is authenticated
  const isAuthenticated = !!user;

  // On component mount, check if there's an active session
  useEffect(() => 
    {
    const checkSession = async () => {
      try 
      {
        const res = await axios.get("http://localhost:3000/api/session/checklogin",{
          withCredentials: true
        });
        if (res.data) 
        {
          setUser(res.data);  // If session exists, set user
        } 
        else 
        {
          setUser(null);      // No session found
        }
      } 
      catch (err) 
      {
        console.error("Session check failed", err.message || err);
        setUser(null);        // Error checking session
      } 
      finally 
      {
        setLoading(false);    // Session check complete
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to access authentication context
 *
 * @returns {{
 *   user: Object|null,
 *   isAuthenticated: boolean,
 *   login: function,
 *   logout: function,
 *   loading: boolean
 * }} Auth context values
 */
export const useAuth = () => useContext(AuthContext);
