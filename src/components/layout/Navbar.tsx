"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ThemeToggleButton } from "../ThemeToggleButton";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const Navbar = () => {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// When mounted on client, now we can show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		// TODO: create a skeleton loader
		return "loading...";
	}

	return (
		<nav
			aria-label="Navbar"
			className=" my-5 flex items-center justify-center w-full"
		>
			<div className="flex items-center justify-between max-w-[1260px] w-full border-[1px] border-solid rounded-xl px-4 py-2">
				<div>
					{theme === "light" ? (
						<Image
							src={"/assets/logos/logo-icon-light.svg"}
							height={60}
							width={60}
							alt="logo"
							aria-label="logo"
						/>
					) : (
						<Image
							src={"/assets/logos/logo-icon-dark.svg"}
							height={60}
							width={60}
							alt="logo"
							aria-label="logo"
						/>
					)}
				</div>
				<div className="flex items-center">
					<ThemeToggleButton />
					<Link href={"/generate"}>
						<Button className="ml-4">Generate Invoice</Button>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;