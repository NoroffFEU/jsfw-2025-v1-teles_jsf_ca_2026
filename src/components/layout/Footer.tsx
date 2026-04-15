export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const url = "https://telecasternilsen.com";

  return (
    <footer className="mt-4 justify-self-center">
      &copy; {currentYear} -{" "}
      <a href={url} className="hover:underline">
        Devtones Studio
      </a>
    </footer>
  );
};
