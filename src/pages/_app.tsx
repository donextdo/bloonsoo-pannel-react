import Layout from '@/components/Layout/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router =  useRouter ()
  
  // make function that will return the children based on router.pathname
  const getContent = () => {
    // array of all the paths that don't need layout
    if (['/login'].includes(router.pathname)){
      return <Component {...pageProps} />;

    } else {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
    }

    
  };

  return (
    <div className=''>
    {getContent()}
    </div>
  )
  
}
