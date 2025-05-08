'use client';

import React from "react";
import LoginForm from "@/components/LoginForm";
import { supabase } from "../supabaseClient"
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

const LoginSection: React.FC = () => {
    async function handleLogin(email: string, password: string) : Promise<void>
    {
      console.log("got into handle loginb");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Login failed:", error.message);
        alert("Login failed: " + error.message);
        return;
      }
    
      if (data.session) {
        console.log("Login successful. Session:", data.session);

        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !sessionData?.session) {
          console.log('User not signed in or session is invalid');
          return; // Or redirect the user to login
        }

          const accessToken = sessionData.session.access_token;

          await fetch(`${backendURL}/topic/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

      } else {
        console.warn("Login succeeded but no session returned.");
      }
    }

  return <LoginForm onLogin={handleLogin} />;
};

export default LoginSection;