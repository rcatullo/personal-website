"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import NavButton from "./nav-button";

export function NavbarItem({ label, name, href }: { label: string, name: string, href: string }) {
    return (
        <Link
                key={label}
                href={href}
                className="inline-block flex align-middle relative py-1 px-2 m-1"
                >
            <span className="group transition duration-500 ease-in-out relative">
                <span className="absolute bg-gradient-to-r from-light-platinum via-light-aztec-gold to-light-dirty-brown dark:from-dirty-brown dark:via-aztec-gold dark:to-platinum bg-clip-text text-transparent transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 cursor-pointer">{name}</span>
                <span className="relative text-black dark:text-white transition-opacity duration-500 ease-in-out group-hover:opacity-0 cursor-pointer">{name}</span>
            </span>
        </Link>
    )
}

export function NavbarAuth() {
    const { data: session } = useSession();

    return (
        <div className="ml-auto">
            {session ? (
                <NavButton onClick={() => signOut()}>
                    logout
                </NavButton>
            ) : (
                <NavButton onClick={() => signIn()}>
                    login
                </NavButton>
            )}
        </div>
    );
}
    