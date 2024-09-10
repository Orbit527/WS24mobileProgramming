
export function fetchMeals(keyword) {
  return fetch(`${process.env.EXPO_PUBLIC_API_URL}?i=${keyword}`).then(
    (response) => {
      //then takes a function as an argument
      if (!response.ok)
        throw new Error("Something went wrong!" + response.statusText);

      return response.json();
    }
  );
}
