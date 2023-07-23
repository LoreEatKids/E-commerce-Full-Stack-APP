import React from "react";

export type userTypeRegister = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type userTypeLogin = {
  email: string;
  password: string;
}

export type childrenType = {
  children: React.ReactNode;
}