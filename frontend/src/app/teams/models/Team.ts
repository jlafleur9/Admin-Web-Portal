import Teammate from './Teammate';

export default interface Team {
  profile: any;
  id: number;
  name: string;
  description: string;
  teammates: Teammate[];
  projects: number;
}
