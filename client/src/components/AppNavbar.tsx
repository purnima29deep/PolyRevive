import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Recycle, Plus, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AppNavbar = () => {
  const location = useLocation();
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/ai-sorting', label: 'AI Sorting', highlighted: true },
    { href: '/support', label: 'Support' },
  ];

  // Check if user is logged in (you can replace this with actual auth logic)
  const isLoggedIn = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <Recycle className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              PolyRevive
            </span>
          </Link>

          {/* Right side - Navigation and Actions */}
          <div className="flex items-center gap-8">
            {/* Navigation Items */}
            <div className="flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.href} to={item.href}>
                    <span className={`font-medium text-lg transition-colors flex items-center gap-2 ${
                      isActive 
                        ? 'text-green-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    } ${item.highlighted ? 'bg-green-100 px-3 py-1 rounded-lg' : ''}`}>
                      {item.highlighted && <Zap className="h-4 w-4 text-green-600" />}
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2 px-6 py-3 text-lg">
                <Plus className="h-5 w-5" />
                Book Pickup
              </Button>

              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="https://tse3.mm.bing.net/th?id=OIP.G0-rgY-iYnZgqF_DiS-_oQHaHa&pid=Api&P=0&h=180" alt="User" />
                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white text-lg">
                          AS
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Akshit Saxena</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          akshit@gmail.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Recycling History
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Link to="/">Sign Out</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" className="font-medium text-lg">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
