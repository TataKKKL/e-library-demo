import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Card className="rounded-none">
      <CardContent className="relative p-6">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
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
              className="text-primary hover:text-primary/80 transition-colors"
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
