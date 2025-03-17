import {  SignedOut,  UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignedInOAuthButton from "./SignedInOAuthButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const Topbar = () => {
  const { isAdmin } = useAuthStore();

  return (
    <div className='flex rounded-md items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
      <div className='flex gap-2 items-center'>
        <img src='/spotify.png' className='size-8' alt='spotify-logo' />
        Spotify
      </div>
      <div className='flex items-center gap-4'>
        {isAdmin && (
          <Link className={cn(buttonVariants({
            variant: "outline"
          }))} to={"/admin"}>
            <LayoutDashboardIcon className='size-4 mr-2' /> Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignedInOAuthButton />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
