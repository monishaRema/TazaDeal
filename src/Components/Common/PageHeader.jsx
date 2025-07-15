import React from "react";
import { Link } from "react-router";

const PageHeader = ({ links, pageTitle, presentPage }) => {
  return (
    <section className="bg-gray-100 py-15">
      <div className="container px-5 mx-auto text-center">
        <p className="mb-5">
          <Link className="text-gray-500 hover:text-primary/80" to="/">
            Home /{" "}
          </Link>
          {links && (
            <Link
              className="text-gray-500 hover:text-primary/80"
              to={links.path}
            >
              {links.page} /
            </Link>
          )}
          <span className="text-primary font-semibold">{presentPage}</span>
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          {pageTitle}
        </h1>
      </div>
    </section>
  );
};

export default PageHeader;
