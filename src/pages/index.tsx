import type { GetServerSideProps, NextPage } from "next";
import { getSession, signIn } from "next-auth/react";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Home: NextPage = () => {
  const handleSignIn = async () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <>
      <Head>
        <title>Login | Quests Planner</title>
      </Head>
      <div className="flex flex-col h-screen w-screen">
        <div className="h-full bg-gray-800 flex flex-col items-center justify-center">
          <h1 className="text-5xl text-gray-50 font-bold">Quests Planner</h1>
          <p className="text-lg text-gray-500 mt-2">
            Planeje as missões da vida Real
          </p>
        </div>
        <div className="h-full bg-gray-200 flex flex-col items-center">
          <div className="bg-gray-50 shadow rounded-md p-8 max-w-max text-gray-800 -mt-12">
            <h2 className="text-lg font-bold mb-8">Login</h2>
            <button
              onClick={() => handleSignIn()}
              className="rounded py-2 px-4 bg-red-500 text-gray-50 text-sm hover:bg-red-600 transition-colors duration-250"
            >
              Entrar com uma conta do Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
