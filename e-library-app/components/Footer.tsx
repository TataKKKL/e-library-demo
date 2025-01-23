import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Card className="rounded-none bg-gray-100 dark:bg-gray-500">
      <CardContent className="relative p-6">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 text-gray-200 dark:text-gray-700">
          <span className="text-6xl font-bold text-muted-foreground whitespace-nowrap">
            © {currentYear} - Built with NextJS
          </span>
        </div>
        
        {/* Foreground Content */}
        <div className="flex justify-end">
          <p className="text-sm text-muted-foreground">
            © {currentYear}, Built with{' '}
            <a 
              href="https://nextjs.org/"
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600"
            >
              NextJS
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Footer;
