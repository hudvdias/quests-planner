import { NextPage } from "next";
import Head from "next/head";
import {
  HiCalendar,
  HiDotsVertical,
  HiExclamationCircle,
} from "react-icons/hi";
import { Header } from "../../components/Header";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Missões | Quests-Planner</title>
      </Head>
      <div className="flex-col h-screen w-screen bg-gray-200">
        <Header />
        <main className="text-gray-800 p-4">
          <div>
            <h2 className="mb-2 text-xl font-bold">Categorias</h2>
            <div className="py-1 px-2 border w-max border-gray-500  rounded">
              <p className="text-sm">Categoria</p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="mb-2 text-xl font-bold">Missões</h2>
            <div className="bg-gray-50 text-gray-600 p-4 shadow rounded-md flex items-center">
              <HiExclamationCircle className="text-xl mr-2" />
              <p className="flex grow">Título da missão</p>
              <p className="text-sm mx-2">Categoria</p>
              <div className="flex items-center text-sm mx-2">
                <HiCalendar className="mr-1" />
                <p>29/03/2022</p>
              </div>
              <select
                name="status"
                className="text-sm mx-2 border border-gray-600 rounded"
              >
                <option value="">A Fazer</option>
                <option value="">Em progresso</option>
                <option value="">Aguardando</option>
                <option value="">Concluída</option>
              </select>
              <HiDotsVertical className="ml-2" />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
