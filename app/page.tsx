import { getUser } from '@/utils/supabase/queries';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function Dashboard() {
  const supabase = createClient();
  const [user] = await Promise.all([getUser(supabase)]);

  console.log('userrrrrrrrrrrrrrrrrrr', user);
  console.log(JSON.stringify(user));

  if (!user) {
    return redirect('/dashboard/signin');
  } else {
    redirect('/dashboard2/main');
  }
}
