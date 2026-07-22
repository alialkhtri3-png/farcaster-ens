import { useEffect, useState } from "react";
import IdentityCard from "./components/IdentityCard";
import { getIdentity } from "./api/identity";

export default function App() {
  const [identity, setIdentity] = useState(null);

  useEffect(() => {
    getIdentity("0x0000000000000000000000000000000000000000")
      .then(setIdentity)
      .catch(console.error);
  }, []);

  return (
    <main>
      <IdentityCard identity={identity} />
    </main>
  );
}
