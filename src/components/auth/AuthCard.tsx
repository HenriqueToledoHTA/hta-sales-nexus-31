
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <Card className="max-w-md w-full border-none shadow-xl bg-hta-dark-card">
        <div className="p-6 sm:p-8">
          <div className="mb-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-10 h-10 rounded-full bg-hta-highlight flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {description && <p className="mt-2 text-sm text-gray-400">{description}</p>}
          </div>
          {children}
        </div>
      </Card>
    </div>
  );
}
