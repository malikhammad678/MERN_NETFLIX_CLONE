import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-toastify';
export const useAuthStore = create((set) => ({
    user: null,
    isLoading:false,
    isAuthenticating:true,
    isLoggingIn:false,
    signup: async (credentials) => {
         set({isLoading:true})
         try {
            const response = await axios.post("/api/v1/auth/signup",credentials);
            set({user:response.data.user,isLoading:false})
            toast.success("Account created successfully");
         } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || "Failed to SignUp")
            set({isLoading:false,user:null})
         }
    },
    checkAuth: async () => {
      set({ isAuthenticating: true});
      try {
        const response = await axios.get("/api/v1/auth/checkAuth");

        if (response.data && response.data.user) {
          set({ user: response.data.user, isAuthenticating: false,isLoading:false });
        } else {
          set({ user: null, isAuthenticating: false });
          console.log('User data not found in response:', response.data);
        }
      } catch (error) {
        console.log('Error during authentication check:', error.response ? error.response.data : error.message);
        set({ isAuthenticating: false, user: null });
      }
    },
    logout: async () => {
      set({isLoading:true})
      try {
         const response = await axios.post("/api/v1/auth/logout");
         set({user:null,isLogout:false,isLoading:false,isLoading:false})
         toast.success(response.data.message || "Logout Successfully!");
      } catch (error) {
         console.log(error);
         set({isLogout:false,isLoading:false})
         toast.error(error.response.data.message || "Error in logout")
         
      }
    },
    login: async (data) => {
      set({isLoggingIn:true,isLoading:true})
      try {
         const response = await axios.post("/api/v1/auth/login",data)
         set({user:response.data.user,isLoggingIn:false,isLoading:false})
         toast.success(response.data.message || "Login Successfully!")
      } catch (error) {
         console.log(error)
         set({isLoggingIn:false,isLoading:false})
         toast.error(error.response.data.message)
      }
    }
    
}))