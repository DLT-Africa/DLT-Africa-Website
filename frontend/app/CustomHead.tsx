import { Metadata } from 'next';
import Head from 'next/head';


export const metadata: Metadata = {
    title: 'DLT Africa',
    description: 'DLT Africa Official Website',
};


export default function CustomHead() {
  return (
    <Head>
      <title>{metadata.title as string}</title>
      <meta name="description" content={metadata.description as string} />
      <link rel="icon" href="/dlt.png" />
    </Head>
  );
}
