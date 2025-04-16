/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User } from '@supabase/supabase-js';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@/utils/supabase/client';
import { getURL, getStatusRedirect } from '@/utils/helpers';
import { Input } from '@/components/ui/input';

interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null;
}

const supabase = createClient();
export default function Settings(props: Props) {
  // Input States
  const [nameError, setNameError] = useState<{
    status: boolean;
    message: string;
  }>();
  console.log(props.user);
  console.log(props.userDetails);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    // Check if the new email is the same as the old email
    if (e.currentTarget.newEmail.value === props.user.email) {
      e.preventDefault();
      setIsSubmitting(false);
      return;
    }
    // Get form data
    const newEmail = e.currentTarget.newEmail.value.trim();
    const callbackUrl = getURL(
      getStatusRedirect(
        '/dashboard/settings',
        'Success!',
        `Your email has been updated.`
      )
    );
    e.preventDefault();
    const { error } = await supabase.auth.updateUser(
      { email: newEmail },
      {
        emailRedirectTo: callbackUrl
      }
    );
    router.push('/dashboard/settings');
    setIsSubmitting(false);
  };

  const handleSubmitName = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    // Check if the new name is the same as the old name
    if (e.currentTarget.fullName.value === props.user.user_metadata.full_name) {
      e.preventDefault();
      setIsSubmitting(false);
      return;
    }
    // Get form data
    const fullName = e.currentTarget.fullName.value.trim();

    const { error } = await supabase
      .from('users')
      .update({ full_name: fullName })
      .eq('id', props.user?.id);
    if (error) {
      console.log(error);
    }
    e.preventDefault();
    supabase.auth.updateUser({
      data: { full_name: fullName }
    });
    router.push('/dashboard/settings');
    setIsSubmitting(false);
  };

  const notifications = [
    { message: 'Your call has been confirmed.', time: '1 hour ago' },
    { message: 'You have a new message!', time: '1 hour ago' },
    { message: 'Your subscription is expiring soon!', time: '2 hours ago' }
  ];

  return (
    <DashboardLayout
      user={props.user}
      userDetails={props.userDetails}
      title="Project settings"
      description="Manage your project settings"
    >
      <div className="max-w-3xl mx-auto py-8">
        <div className="space-y-6">
          {/* Project Name Section */}
          <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Project name
                </h3>
                <p className="text-lg font-medium mt-1">
                  {props.userDetails?.project_name || "Jack's Stories"}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </div>

          {/* Storyteller Section */}
          <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Storyteller
                </h3>
                <p className="text-lg font-medium mt-1">
                  {props.user?.user_metadata?.full_name}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </div>

          {/* Transcription Mode Section */}
          <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Transcription mode
                </h3>
                <p className="text-lg font-medium mt-1">First person</p>
                <p className="text-sm text-gray-500 mt-1">
                  Our AI writing assistant generates a story from the original
                  transcription, told from the first-person perspective
                </p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </div>

          {/* Prompt Settings Section */}
          <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Prompt settings
              </h3>
              <p className="text-sm mt-2">
                {props.user?.user_metadata?.full_name} will receive prompts from
                Remento every Sunday, Monday, Tuesday, Wednesday, Thursday,
                Friday, and Saturday at 12:01 AM GMT+8.
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                Edit prompt settings
              </Button>
            </div>
          </div>

          {/* Ownership Section */}
          <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Ownership
              </h3>
              <p className="text-sm mt-2">
                This project is included in your subscription, which is active
                until 04/05/2026.
              </p>
            </div>
          </div>

          {/* Backup Section */}
          <div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Backup
              </h3>
              <p className="text-lg font-medium mt-1">
                The stories shared are forever yours.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Send us an email at support@x.co to request a backup of{' '}
                {props.user?.user_metadata?.full_name}'s stories.
              </p>
              <Button variant="link" className="text-sm text-primary p-0 mt-2">
                View our privacy policy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
