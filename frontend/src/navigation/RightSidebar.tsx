import { NavLink } from 'react-router';

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  path: string;
}

interface UserProfile {
  name: string;
  avatar: string;
}

export default function RightSidebar({ isOpen, onClose }: RightSidebarProps) {
  // Dummy user data
  const user: UserProfile = {
    name: 'Alex Johnson',
    avatar: 'https://unsplash.com'
  };

  const navItems: NavItem[] = [
    { name: 'Dashboard', path: '/navigation/dashboard' },
    { name: 'Courses', path: '/navigation/courses' },
    { name: 'Chats', path: '/navigation/chats' },
    { name: 'Groups', path: '/navigation/groups' },
    { name: 'Users', path: '/navigation/users' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    `flex items-center px-4 py-3 rounded-xl transition-colors text-sm font-medium ${isActive
      ? 'bg-blue-50 text-blue-600'
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Sidebar Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Header / Close Area */}
        <div className="flex justify-start p-4 border-b border-gray-100">
          <button
            onClick={onClose}
            className="p-2 -ml-2 text-gray-400 hover:text-gray-600"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={linkClass}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer Area (Sign Out & Profile) */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-4">
          {/* Sign Out Option */}
          <button
            onClick={() => { console.log('Signing out...'); onClose(); }}
            className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
          >
            Sign Out
          </button>

          {/* Profile Section */}
          <div className="flex items-center gap-3 px-2 pt-2 border-t border-gray-100">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover bg-gray-100"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
