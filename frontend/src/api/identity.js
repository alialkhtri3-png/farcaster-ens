export async function getIdentity(address) {
  const res = await fetch(
    "http://localhost:3000/api/identity",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    }
  );

  if (!res.ok) {
    throw new Error("Identity API error");
  }

  return await res.json();
}
