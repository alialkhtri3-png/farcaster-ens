export default function IdentityCard({identity}) {
  return (
    <div>
      <h2>Sovereign Identity Passport</h2>

      <p>DID: {identity?.did || "Not Found"}</p>

      <p>
        Status:
        {identity?.verified ? " Verified ✅" : " Pending"}
      </p>

      <p>
        Reputation:
        {identity?.reputation || 0}/100
      </p>
    </div>
  );
}
