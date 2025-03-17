// import { Link } from 'react-router-dom';
// import ROUTES from '../app/routes/routes.enum';

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      {/*<Link to="/" className="text-2xl font-bold text-gray-900">MyApp</Link>*/}

      {/* Navigation */}
      {/*<nav className="space-x-6">*/}
      {/*  <Link to={ROUTES.SHOP} className="text-gray-700 hover:text-gray-900">Offers</Link>*/}
      {/*  <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>*/}
      {/*</nav>*/}

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        {/*<UserCircle className="w-6 h-6 text-gray-700" />*/}
        {/*<LogOut className="w-6 h-6 text-gray-700 cursor-pointer" />*/}
      </div>
    </header>
  );
}