export const fetchedLineItems = async (session_id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSessions?session_id=${session_id}`
  );

  if (!res.ok) return;

  const data = await res.json();
  const product = data.session.data;

  return product;
};
