export async function getIdentity(address) {
  const response = await fetch(
    `/api/identity/${address}`
  );

  return response.json();
}
