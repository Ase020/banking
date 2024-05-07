import { logOutUser } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function Footer({ user, type = "desktop" }: FooterProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const logout = await logOutUser();
    if (logout) {
      router.push("/sign-in");
    }
  };

  console.log("User: ", user);

  return (
    <footer className="footer">
      <div
        className={cn(type === "mobile" ? "footer_name-mobile" : "footer_name")}
      >
        <p className="text-xl font-bold text-gray-700">{user?.name[0]}</p>
      </div>

      <div
        className={cn(
          type === "mobile" ? "footer_email-mobile" : "footer_email"
        )}
      >
        <h1 className="text-gray-700 text-14 truncate font-semibold">
          {user?.name}
        </h1>

        <p className="text-gray-600 text-14 truncate font-normal">
          {user?.email}
        </p>
      </div>

      <div className="footer_image" onClick={handleLogout} role="button">
        <Image src="/icons/logout.svg" alt="logout" fill />
      </div>
    </footer>
  );
}

export default Footer;
