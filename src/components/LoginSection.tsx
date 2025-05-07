'use client';

import React from "react";
import LoginForm from "@/components/LoginForm";
import { supabase } from "../supabaseClient"

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
      } else {
        console.warn("Login succeeded but no session returned.");
      }
    }

  return <LoginForm onLogin={handleLogin} />;
};

export default LoginSection;