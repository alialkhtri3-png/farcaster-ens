export default function IdentityCard({ identity }) {
  if (!identity) return null;

  return (
    <section>
      <h2>Sovereign Identity Passport</h2>

      <p>
        DID: {identity.identity?.did || "Not Found"}
      </p>

      <p>
        Status: {
          identity.identity?.active
            ? "Verified"
            : "Pending"
        }
      </p>

      <p>
        Balance: {identity.wallet?.balanceETH || "0"} ETH
      </p>

      <p>
        Transactions: {identity.wallet?.transactions || 0}
      </p>

      <p>
        Engine: {identity.engine}
      </p>
    </section>
  );
}
