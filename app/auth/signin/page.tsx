"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Image from "next/image";

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export default function SignIn() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null
  );

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  return (
    <section className="bg-gray-800 h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center mt-40 text-center">
        <Image
          src="https://res.cloudinary.com/dcwuuolk8/image/upload/v1650308268/Plix/plix-logo-w_yrxkmt.png"
          alt="logo"
          height={200}
          width={600}
        />
        <p className="font-xs italic text-gray-200 pt-20">
          This is not a real App, it is built for educational purposes only.
        </p>
        {providers &&
          Object.values(providers).map((provider) => (
            <div
              className="flex flex-col items-center space-y-3 pt-5"
              key={provider.name}
            >
              <button
                className="bg-gray-300 rounded-2xl m-2 p-2"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </section>
  );
}
