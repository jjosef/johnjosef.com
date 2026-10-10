import { Heading, Link } from '@/components';

const projects = [
  {
    name: 'btfp',
    href: 'https://github.com/bubltec/btfp',
    description: 'View and contribute bad things for different types of pets.',
  },
  {
    name: 'mycota',
    href: 'https://github.com/bubltec/mycota',
    description: 'A simple framework for building apps that can do anything.',
  },
  {
    name: 'greed',
    href: 'https://github.com/bubltec/greed',
    description: 'GREED',
  },
  {
    name: 'dotio',
    href: 'https://github.com/bubltec/dotio',
    description: 'The bubbletech.io website.',
  },
  {
    name: 'switchboard-mcp',
    href: 'https://github.com/bubltec/switchboard-mcp',
  },
];

export const Projects = () => {
  return (
    <div className="p-2">
      <Heading>Projects</Heading>
      <p className="pb-4">
        My main projects are at{' '}
        <Link href="https://github.com/bubltec">github.com/bubltec</Link>. The
        company site is{' '}
        <Link href="https://bubbletech.io">bubbletech.io</Link>.
      </p>
      <ul className="list-disc list-inside space-y-3">
        {projects.map((project) => (
          <li key={project.name}>
            <Link href={project.href}>{project.name}</Link>
            {project.description ? (
              <p className="text-sm pl-5">{project.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};
