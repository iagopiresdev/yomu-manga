const Footer = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 lg:px-8 xl:flex-row">
      <h5 className="mb-4 text-center text-sm font-medium text-light-text-accent hover:underline dark:text-dark-tex sm:!mb-0 md:text-lg">
        <p className="mb-4 text-center text-sm text-light-text-accent hover:underline dark:text-dark-tex sm:!mb-0 md:text-base">
          ©{new Date().getFullYear()} Yomu Manga. All rights reserved.
        </p>
      </h5>
      <div>
        <ul className="flex flex-wrap items-center gap-3 sm:flex-nowrap md:gap-10">
          <li>
            <a
              target="blank"
              href="https://portifolio-iagopiresdev.vercel.app/"
              className="text-base font-medium text-light-text-accent hover:underline dark:text-dark-tex"
            >
              Support
            </a>
          </li>
          <li>
            <a
              target="blank"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
              className="text-base font-medium text-light-text-accent hover:underline dark:text-dark-tex"
            >
              License
            </a>
          </li>
          <li>
            <a
              target="blank"
              href="https://www.youtube.com/watch?v=lx0eir2xF5E&ab_channel=CriaScript"
              className="text-base font-medium text-light-text-accent hover:underline dark:text-dark-tex"
            >
              Terms of Use
            </a>
          </li>
          <li>
            <a
              target="blank"
              href="https://medium.com/@iagopires.dev"
              className="text-base font-medium text-light-text-accent hover:underline dark:text-dark-tex"
            >
              Medium
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
