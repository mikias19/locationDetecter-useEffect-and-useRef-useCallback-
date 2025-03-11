export async function fetchAvaliablePlace() {
  const response = await fetch("http://localhost:3000/places");
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch available places");
  }
  return responseData.places;
}

export async function fetchSelectedPlace(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update selected places");
  }

  return responseData.places;
}
export async function fetchUserPlace() {
  const response = await fetch("http://localhost:3000/user-places");
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update selected places");
  }

  return responseData.places;
}
