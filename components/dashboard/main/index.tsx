/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';
import { useModal } from '@/components/modal/modal-context';
import { StoryCard } from '@/components/StroyCard';
import { User } from '@supabase/supabase-js';

interface UserDetails {
  [key: string]: any;
}

interface Props {
  user: User | null | undefined;
  userDetails: UserDetails | null;
}

const STORY_CARDS = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=3716&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title:
      'Hand opacity boolean image style distribute. Outline blur layer image subtract project bullet variant distribute vertical.',
    author: {
      name: 'John Doe',
      avatar: 'https://github.com/shadcn.png'
    },
    date: '2023-01-01'
  }
  // ... 可以添加更多卡片数据
];

export default function Dashboard(props: Props) {
  const { showModal } = useModal();

  return (
    <DashboardLayout
      user={props.user}
      userDetails={props.userDetails}
      title="Dashboard"
      description="Your AI prompts dashboard"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {STORY_CARDS.map((card, index) => (
              <div
                key={index}
                className="group relative h-[260px] transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-full">
                  <StoryCard
                    imageUrl={card.imageUrl}
                    title={card.title}
                    author={card.author}
                    date={card.date}
                  />
                </div>
              </div>
            ))}

            <button
              className="group relative flex h-[260px] transform cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white text-center transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:bg-gray-50 hover:shadow-lg"
              onClick={() => {
                showModal('form', {
                  title: 'Create New Prompt',
                  description: 'Create a new AI prompt template',
                  onSubmit: (data: any) => {
                    console.log(data);
                  }
                });
              }}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="rounded-full bg-gray-100 p-4 group-hover:bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-600 group-hover:text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    Add New Prompt
                  </h3>
                  <p className="text-sm text-gray-500">
                    Create a new AI prompt template
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
