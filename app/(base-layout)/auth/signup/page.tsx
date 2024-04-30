import SignUpCard from '@/features/auth/signUp/SignUpCard';
import { auth } from '@/lib/auth/helper';
import { SiteConfig } from '@/utils/site-config';
import { redirect } from 'next/navigation';

const Page = async () => {
  const user = await auth();

  if (user) {
    redirect('/');
  }

  if (!SiteConfig.auth.password) {
    redirect('/auth/signin');
  }

  return <SignUpCard />;
};

export default Page;
