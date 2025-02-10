import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, History, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import type { GetServerSidePropsContext } from 'next';
import type { User } from '@supabase/supabase-js';

import { createClient } from '@/utils/supabase/server-props';

interface UserDashboardProps {
  user: User;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  console.log(user);
  console.log(user.email);
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Library</h1>
        <p className="text-muted-foreground">Welcome back, {user.email}!</p>
      </div>

      {/* Currently Reading Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Currently Reading</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">The Great Gatsby</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Due in 7 days</p>
              <div className="flex justify-between items-center">
                <p className="text-xs">75% complete</p>
                <Button variant="outline" size="sm">Renew</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="hover:bg-accent transition-colors cursor-pointer">
          <CardContent className="flex items-center p-4">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            <span>Browse Books</span>
          </CardContent>
        </Card>

        <Card className="hover:bg-accent transition-colors cursor-pointer">
          <CardContent className="flex items-center p-4">
            <History className="h-5 w-5 mr-2 text-primary" />
            <span>Loan History</span>
          </CardContent>
        </Card>

        <Card className="hover:bg-accent transition-colors cursor-pointer">
          <CardContent className="flex items-center p-4">
            <Star className="h-5 w-5 mr-2 text-primary" />
            <span>My Favorites</span>
          </CardContent>
        </Card>
      </div>

      {/* Reading List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">My Reading List</h2>
        <div className="grid gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Reading List Item */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">1984</h3>
                    <p className="text-sm text-muted-foreground">George Orwell</p>
                  </div>
                  <Button variant="outline" size="sm">Reserve</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">The Hobbit</h3>
                    <p className="text-sm text-muted-foreground">J.R.R. Tolkien</p>
                  </div>
                  <Button variant="outline" size="sm">Reserve</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm">Borrowed &quot;The Great Gatsby&quot;</p>
                  <p className="text-xs text-muted-foreground">2 weeks ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm">Returned &quot;Pride and Prejudice&quot;</p>
                  <p className="text-xs text-muted-foreground">1 month ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context)

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: data.user,
    },
  }
}