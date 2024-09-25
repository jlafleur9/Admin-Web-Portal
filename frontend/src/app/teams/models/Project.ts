import Team from "./Team";

export default interface Project {
    id: number,
    description: string,
    active: boolean,
    team: Team;
}