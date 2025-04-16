'use client';

import { Button } from '@/components/ui/button';
import { PromptCell } from '@/components/PromptCell';
import { PlusCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout';
import { UserDetails } from '@/types/types';
import { User } from '@supabase/supabase-js';
import { useModal } from '@/components/modal/modal-context';

interface Prompt {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
  status: 'in_progress' | 'to_be_sent';
}

interface Props {
  user: User | null | undefined;
  userDetails: UserDetails | null;
}

export default function Prompts(props: Props) {
  const { showModal } = useModal();

  const prompts: Prompt[] = [
    // 示例数据
    {
      id: '1',
      content:
        'How did your relationship with your parents change as you got older?',
      createdAt: '9 hours ago',
      user: {
        id: '1',
        name: 'User 1',
        image: 'https://avatar.iran.liara.run/public/39'
      },
      status: 'in_progress'
    }
    // ... 其他提示数据
  ];

  return (
    <DashboardLayout
      user={props.user}
      userDetails={props.userDetails}
      title="Dashboard"
      description="Your AI prompts dashboard"
    >
      <div className="p-6">
        <div className="flex items-center justify-end mb-6">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                showModal('invite', {
                  onSubmit: (email) => {
                    console.log('Invite email:', email);
                  }
                });
              }}
            >
              Invite
            </Button>
            <Button
              className="gap-2"
              onClick={() => {
                showModal('addPrompt', {
                  onSubmit: (data) => {
                    // 处理提交的数据
                    console.log('Prompt data:', data);
                    // data.type 可能是 'photo' 或 'question'
                    // data.content 包含问题文本或照片信息
                  }
                });
              }}
            >
              <PlusCircle className="h-4 w-4" />
              Add prompts
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-4">In progress (2)</h2>
            <div className="space-y-4">
              {prompts
                .filter((prompt) => prompt.status === 'in_progress')
                .map((prompt) => (
                  <PromptCell
                    key={prompt.id}
                    prompt={prompt}
                    actionButton={
                      <Button variant="outline" size="sm">
                        Record
                      </Button>
                    }
                  />
                ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">To be sent (2)</h2>
            <div className="space-y-4">
              {prompts
                .filter((prompt) => prompt.status === 'to_be_sent')
                .map((prompt) => (
                  <PromptCell
                    key={prompt.id}
                    prompt={prompt}
                    actionButton={
                      <Button variant="outline" size="sm">
                        Send now
                      </Button>
                    }
                  />
                ))}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
