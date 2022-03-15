import { useSession } from "next-auth/react";
import Image from "next/image";
import { HiDotsVertical } from "react-icons/hi";

export const Header: React.FC = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <header className="flex justify-between bg-gray-900 text-gray-400 p-4">
      {user && (
        <div className="flex">
          <Image
            src={user.image!}
            alt={user.name!}
            height={48}
            width={48}
            className="bg-gray-500 rounded-full"
          />
          <div className="ml-4">
            <p className="text-sm">Olá,</p>
            <strong className="text-gray-50">{user.name}</strong>
          </div>
        </div>
      )}
      <button>
        <HiDotsVertical />
      </button>
    </header>
  );
};
