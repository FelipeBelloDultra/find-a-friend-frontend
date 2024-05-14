import svgLogoWhite from "/public/svg/logo-white.svg";
import imgPets from "/public/imgs/pets.png";

export function ImgBackground() {
  return (
    <aside className="max-w-lg w-full sticky top-20 h-[740px]">
      <div className="h-full rounded-[20px] bg-secondary flex items-center flex-col justify-between pt-28 pb-20 px-14">
        <img
          src={svgLogoWhite}
          height={46}
          width={174}
          alt="Logo white"
          className="max-h-[46px] max-w-[174px] w-full block object-contain"
        />

        <img
          src={imgPets}
          height={195}
          width={384}
          alt="Image pets"
          className="max-h-[195px] max-w-[384px] w-full block object-contain"
        />
      </div>
    </aside>
  );
}
