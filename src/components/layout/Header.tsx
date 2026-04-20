import { Link } from "@tanstack/react-router";

export const Header = () => {
  const navElements = [
    {
      url: "/",
      name: "Home",
    },
    {
      url: "/products",
      name: "Products",
    },
    {
      url: "/cart",
      name: "Cart",
    },
    {
      url: "/contact",
      name: "Contact",
    },
  ];

  return (
    <>
      <header>
        <nav className="p-2 flex gap-2">
          {navElements.map((item) => (
            <Link
              to={item.url}
              key={item.name}
              className="[&.active]:border-blue-600 border-b-2 border-transparent hover:border-b-2 hover:border-blue-600"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
};
