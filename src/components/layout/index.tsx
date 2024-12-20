import { Helmet } from 'react-helmet'

export function Layout(props: React.PropsWithChildren<{
  title: string
}>) {
  const { children, title } = props;

  return (
    <div className="px-4 flex flex-col items-center">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className='w-full md:w-[768px]'>
        {children}
      </main>
    </div>
  );
}