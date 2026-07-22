import { useEffect, useState } from "react";
import IdentityCard from "./components/IdentityCard";
import { getIdentity } from "./api/identity";

export default function App() {
  const [identity, setIdentity] = useState(null);

  const walletAddress =
    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";

  useEffect(() => {
    getIdentity(walletAddress)
      .then(setIdentity)
      .catch(console.error);
  }, []);

  return (
    <main>
      <h1>Sovereign Identity Passport V11</h1>

      {identity ? (
        <IdentityCard identity={identity} />
      ) : (
        <p>Loading identity...</p>
      )}
    </main>
  );
}
