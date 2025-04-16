/*eslint-disable*/
'use client';

import MainChart from '@/components/dashboard/main/cards/MainChart';
import MainDashboardTable from '@/components/dashboard/main/cards/MainDashboardTable';
import DashboardLayout from '@/components/layout';
import { StoryCard } from '@/components/StroyCard';
import tableDataUserReports from '@/variables/tableDataUserReports';
import { User } from '@supabase/supabase-js';
interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
}

export default function Settings(props: Props) {
  return (
    <DashboardLayout
      user={props.user}
      userDetails={props.userDetails}
      title="Subscription Page"
      description="Manage your subscriptions"
    >
      <div className="h-full w-full">
        <div>
         <div className="mb-5 flex gap-5 flex-col xl:flex-row w-full">
          <StoryCard imageUrl="https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=3716&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="Hand opacity boolean image style distribute. Outline blur layer image subtract project bullet variant distribute vertical." author={{ name: "John Doe", avatar: "https://github.com/shadcn.png" }} date="2023-01-01" />
          <StoryCard imageUrl="https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=3716&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="Hand opacity boolean image style distribute. Outline blur layer image subtract project bullet variant distribute vertical." author={{ name: "John Doe", avatar: "https://github.com/shadcn.png" }} date="2023-01-01" />
          <StoryCard imageUrl="https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=3716&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="Hand opacity boolean image style distribute. Outline blur layer image subtract project bullet variant distribute vertical." author={{ name: "John Doe", avatar: "https://github.com/shadcn.png" }} date="2023-01-01" />
        </div>
        </div>
        {/* <div className="mb-5 flex gap-5 flex-col xl:flex-row w-full">
          <MainChart />
        </div> */}
        {/* Conversion and talbes*/}
        {/* <div className="h-full w-full rounded-lg ">
          <MainDashboardTable tableData={tableDataUserReports} />
        </div> */}
      </div>
    </DashboardLayout>
  );
}
