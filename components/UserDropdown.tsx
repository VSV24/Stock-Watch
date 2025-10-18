import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {Button} from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import Navitems from './Navitems';



const UserDropdown = () => {

  const router = useRouter();

  const handleSignOut = async () => {
      router.push("/sign-in");
  }

  const user = { name: 'Toji', email: 'tojifushigiro@jjk.com' };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="flex items-center gap-3 text-grey-4 hover:text-yellow-500">
          <Avatar className='h-8 w-8'>
            <AvatarImage src="https://imgs.search.brave.com/7brhBX22RZi58GivU_1LfadXmB-qFBgU7J_KLrTa27w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ibG9n/Z2VyLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS9pbWcvYi9SMjl2/WjJ4bC9BVnZYc0Vp/czY2Y3B1QjlYd2x3/T00zZzQ1RW9ROERQ/eG5mNXhrS2l4WGha/TjlBRURXa2xfYk9z/ODhXTUk3TzNWVmRI/VDlHLTExZURCaE8w/elZWZ1MtVlN6UnJL/X0V2X1VMRG9Kc2h4/UTAxbDFNRXVkbzZ0/SmlNcFFvektIa2Fz/NnJoZVVRT2VGQktH/UUlETUVPbEVQMmdD/MU40dVZSZ0FzazBW/V3VSTWRqblU4Y1pv/czVKU1lHSWlyMXpI/SWg0a2ZCZ2YxL3Mx/NjAwMC1ydy90b2pp/LXBmcC0zMy5qcGc" />
            <AvatarFallback className='bg-yellow-500 text-yellow-900 text-sm font-bold'>
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className='hidden md:flex flex-col items-start '>
            <span className='text-base font-medium text-gray-400'>{user.name}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex relative items-center gap-3 py-2">
            <Avatar className="h-10 w-10">
                <AvatarImage src="https://imgs.search.brave.com/7brhBX22RZi58GivU_1LfadXmB-qFBgU7J_KLrTa27w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ibG9n/Z2VyLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS9pbWcvYi9SMjl2/WjJ4bC9BVnZYc0Vp/czY2Y3B1QjlYd2x3/T00zZzQ1RW9ROERQ/eG5mNXhrS2l4WGha/TjlBRURXa2xfYk9z/ODhXTUk3TzNWVmRI/VDlHLTExZURCaE8w/elZWZ1MtVlN6UnJL/X0V2X1VMRG9Kc2h4/UTAxbDFNRXVkbzZ0/SmlNcFFvektIa2Fz/NnJoZVVRT2VGQktH/UUlETUVPbEVQMmdD/MU40dVZSZ0FzazBW/V3VSTWRqblU4Y1pv/czVKU1lHSWlyMXpI/SWg0a2ZCZ2YxL3Mx/NjAwMC1ydy90b2pp/LXBmcC0zMy5qcGc" />
                <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                    {user.name[0]}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className='text-base font-medium text-gray-400'>
                    {user.name}
                </span>
                <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='bg-gray-600' />
        <DropdownMenuItem onClick={handleSignOut} className='text-gray-100 text-md font-medium  focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer'>
          <LogOut className='h-4 w-4 mr-2 hidden sm:block' />
          Logout
        </DropdownMenuItem>
        <DropdownMenuSeparator className='hidden sm:block bg-gray-600' />
        <nav className='sm:hidden'>
          <Navitems />
        </nav>

      </DropdownMenuContent>
    </DropdownMenu>
    
  )
}

export default UserDropdown
