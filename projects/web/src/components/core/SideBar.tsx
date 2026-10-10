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
          <li>
            <Link href="https://github.com/bubltec">bubltec</Link>
          </li>
          <li>
            <Link href="https://bubbletech.io">bubbletech.io</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
        <Alert className="mt-4 border-slate-400 text-xs !p-2">
          You can keep track of my progress and new projects at my{' '}
          <Link href="https://github.com/jjosef/johnjosef.com">repo page</Link>.
          Main projects live at{' '}
          <Link href="https://github.com/bubltec">github.com/bubltec</Link> and{' '}
          <Link href="https://bubbletech.io">bubbletech.io</Link>.
        </Alert>
      </div>
    </div>
  );
};
