import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { HiSun, HiMoon } from "react-icons/hi";
import { Card, CardContent } from "@/components/ui/card";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="rounded-none border-none bg-gray-100 dark:bg-gray-500">
      <CardContent className="p-6 flex justify-end items-center">
        {mounted && (
            theme === "dark" ? (
              <HiSun 
                className="w-10 h-10 text-yellow-500" 
                role="button" 
                onClick={() => setTheme('light')} 
              />
            ) : (
              <HiMoon 
                className="w-10 h-10 text-gray-900" 
                role="button" 
                onClick={() => setTheme('dark')} 
              />
            )
          )}
      </CardContent>
    </Card>
  );
};

export default Header;