import { Projects } from '@/pages/Projects';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/projects')({
  component: Projects,
});
