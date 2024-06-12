import React from 'react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from './useBreadcrumbs';
import './Breadcrumb.css'; // Import your CSS file for breadcrumb styles

const Breadcrumb = () => {
  const crumbs = useBreadcrumbs();

  return (
    <nav className="breadcrumb">
      <ul>
        <li>
          <Link to="/">Home</Link>
          {crumbs.length > 0 && <span className="breadcrumb-separator">›</span>}
        </li>
        {crumbs.map((crumb, index) => (
          <li key={index}>
            {crumb.path ? (
              <Link to={crumb.path}>{crumb.label}</Link>
            ) : (
              <span>{crumb.label}</span>
            )}
            {index < crumbs.length - 1 && <span className="breadcrumb-separator">›</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
