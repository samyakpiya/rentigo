"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { ShowMoreProps } from "@/types";
import CustomButton from "./CustomButton";
import { updateSearchParams } from "@/utils";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Retrieve scrollY value from localStorage after routing
    const persistentScroll = localStorage.getItem("persistentScroll");
    if (persistentScroll === null) return;

    // Restore the window's scroll position
    window.scrollTo({ top: Number(persistentScroll) });

    // Remove scrollY from localStorage after restoring the scroll position
    // This hook will run before and after routing happens so this check is
    // here to make we don't delete scrollY before routing
    if (Number(persistentScroll) === window.scrollY)
      localStorage.removeItem("persistentScroll");
  }, [searchParams]);

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 12;
    const newPathname = updateSearchParams("limit", `${newLimit}`);

    // Save current scrollY value to localStorage before pushing the new route
    localStorage.setItem("persistentScroll", window.scrollY.toString());
    router.push(newPathname);
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
