"use client";
import { NavbarItem, NavbarAuth } from './ui/navbar-item';


type NavItem = {
  name: string;
  href: string;
}

const navItems: Record<string, NavItem> = {
  'home': {
    name: 'home',
    href: '/',
  },
  'projects': {
    name: 'projects',
    href: '/projects',
  },
  'stacks': {
    name: 'stacks',
    href: '/stacks',
  },
}

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight w-full">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center justify-between w-full px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 items-center">
            {Object.entries(navItems).map(([label, { name, href }]) => {
              return (
                <NavbarItem key={label} label={label} name={name} href={href} />
              )
            })}
          </div>
          <div className="flex items-center">
            <NavbarAuth />
          </div>
        </nav>
      </div>
    </aside>
  )
}
