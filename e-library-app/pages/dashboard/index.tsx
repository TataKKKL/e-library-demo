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