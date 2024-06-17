import svgLogoWhite from "/public/svg/logo-white.svg";
import imgPets from "/public/imgs/pets.png";

export function Home() {
  return (
    <div className="bg-secondary h-full w-full overflow-y-auto">
      <section className="max-w-7xl w-full mx-auto px-8">
        <main className="flex justify-between pt-32 pb-5">
          <aside className="max-w-[490px] w-full flex flex-col justify-between min-h-[574px]">
            <span>
              <img
                src={svgLogoWhite}
                alt=""
              />
            </span>

            <h1 className="font-bold text-7xl -tracking-[2px] text-white">
              Leve a felicidade para o seu lar
            </h1>

            <p className="text-white font-medium text-2xl">
              Encontre o animal de estimação ideal para seu estilo de vida!
            </p>
          </aside>
          <article>
            <img
              src={imgPets}
              alt=""
            />
          </article>
        </main>
      </section>
    </div>
  );
}
