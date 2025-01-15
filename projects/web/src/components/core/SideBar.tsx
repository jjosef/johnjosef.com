import { Alert, Heading, Link } from '@/components';

export const SideBar = () => {
  return (
    <div className="w-100 md:w-80 p-2">
      <div className="px-2">
        <Heading>I love technology</Heading>
        <p className="pb-4">Learn more about me:</p>
        <ul className="list-disc list-inside">
          <li>
            <Link href="https://linkedin.com/in/johnmjosef">LinkedIn</Link>
          </li>
          <li>
            <Link href="https://github.com/jjosef">Github</Link>
          </li>
        </ul>
        <Alert className="mt-4 border-slate-400 text-xs !p-2">
          I'll be adding new content here daily or weekly. You can keep track of
          my progress and new projects at my{' '}
          <Link href="https://github.com/jjosef/johnjosef.com">repo page</Link>.
        </Alert>
      </div>
    </div>
  );
};
