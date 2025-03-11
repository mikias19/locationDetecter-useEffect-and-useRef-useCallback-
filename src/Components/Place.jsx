export default function Place({
  title,
  places,
  fallbacktext,
  onSelectPlace,
  isLoading,
  loadingText,
}) {
  return (
    <section className="max-w-[80rem] my-4 mx-auto p-1 border-2  border-cyan-950  ">
      <h2 className="text-cyan-200 text-3xl font-bold text-center my-4 ">
        {title}
      </h2>
      {isLoading && (
        <p className="text-neutral-300 font-medium text-2xl text-center my-4">
          {loadingText}
        </p>
      )}

      <ul className="flex flex-wrap justify-center items-center max-w-[80rem] gap-10 ">
        {!isLoading && places.length === 0 && (
          <p className="text-xl font-bold text-cyan-200">{fallbacktext}</p>
        )}
        {!isLoading &&
          places &&
          places.length > 0 &&
          places.map((place) => (
            <li key={place.id} className="max-w-[16rem] relative">
              <button onClick={() => onSelectPlace(place)}>
                <img
                  src={`http://localhost:3000/${place.image.src}`}
                  alt={place.image.src}
                  className="w-[20rem] h-[10rem] object-contains rounded-lg hover:[&:nth-child(odd)]:shadow-[0_0_8px_4px_rgba(255,217,0,0.6)] focus:[&:nth-child(odd)]:shadow-[0_0_8px_4px_rgba(255,217,0,0.6)]   focus:[&:nth-child(odd)]:rotate-2  hover:[&:nth-child(odd)]:rotate-2 hover:[&:nth-child(even)]:shadow-[0_0_8px_4px_rgba(255,217,0,0.6)] focus:[&:nth-child(even)]:shadow-[0_0_8px_4px_rgba(255,217,0,0.6)]   focus:[&:nth-child(even)]:-rotate-2  hover:[&:nth-child(even)]:-rotate-2  transition-transform duration-200 "
                />
                <h3 className="absolute bottom-0 right-0 mb-4 mr-6 bg-amber-300 rounded-md px-4 py-2  max-w-[14rem] ">
                  {place.title}
                </h3>
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
}
