"use client";

import { Amplify } from "aws-amplify";

export const authConfig = {
  Cognito: {
    userPoolId: "us-east-1_gyr5AgZDI",
    userPoolClientId: "7mc9jvrko3u024uao8dk91b3qu",
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
