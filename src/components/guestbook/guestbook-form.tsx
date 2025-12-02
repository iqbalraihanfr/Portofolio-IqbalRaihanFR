import { useState, type FormEvent } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { clsx } from 'clsx';
import { SiGithub } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import type { CustomSession } from '@/lib/types/api';
import { toast } from 'sonner';

type GuestbookCardProps = {
  session: CustomSession | null;
  registerGuestbook: (message: string) => Promise<void>;
};

export function GuestbookForm({
  session,
  registerGuestbook
}: GuestbookCardProps): React.JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    const input = e.currentTarget[0] as HTMLInputElement;
    const { value } = input;
    
    if (!value.trim()) return;

    // Optimistic UI: Clear immediately
    input.value = '';
    input.blur();
    setLoading(true);

    try {
      await registerGuestbook(value);
      toast.success('Message signed successfully!');
    } catch (error) {
      // Restore value on error if desired, or just show error
      input.value = value; 
      toast.error('Failed to sign guestbook. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className='mt-4 flex items-center gap-2 text-sm transition md:text-base'
        onSubmit={handleSubmit}
      >
        <input
          className={clsx(
            'custom-input w-full disabled:cursor-not-allowed main-border rounded-4xl p-4',
            loading && 'brightness-75'
          )}
          type='text'
          placeholder={
            session ? 'Your message...' : 'Sign in to leave a message'
          }
          disabled={loading || !session}
          required
        />
        {session ? (
          <Button
            type='submit'
            className='custom-button clickable font-bold text-gray-600 dark:text-gray-300'
            disabled={loading} 
          >
            {loading ? 'Signing...' : 'Sign'}
          </Button>
        ) : (
          <Button
            className='custom-button clickable flex items-center gap-2 whitespace-nowrap
                       font-bold text-gray-600 dark:text-gray-300'
            onClick={handleSignIn}
            type="button"
          >
            <SiGithub className='h-5 w-5' />
            Sign in
          </Button>
        )}
      </form>
    
      {session && (
        <button
          className='smooth-tab mt-2 border-none text-sm font-medium text-gray-700 transition
                     hover:text-black disabled:cursor-not-allowed disabled:brightness-50 
                     dark:text-gray-200 dark:hover:text-white md:text-base'
          onClick={handleSignOut}
          disabled={loading}
          type="button"
        >
          ← Sign out @{session.user.name}
        </button>
      )}
    </>
  );
}

function handleSignIn(): void {
  void signIn('github');
}

function handleSignOut(): void {
  void signOut();
}