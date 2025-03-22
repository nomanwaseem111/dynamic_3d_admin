"use client";

import { Amplify } from "aws-amplify";

export const authConfig = {
  Cognito: {
    userPoolId: "us-east-1_i0Pgz0tJa",
    userPoolClientId: "6lsq38cg5s8m7unmev44ssrvc3",
  },
};

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true }
);

export default function ConfigureAmplifyClientSide() {
  return null;
}
