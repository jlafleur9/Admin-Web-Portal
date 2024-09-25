import { TeamDto } from "./team.dto"

export interface ProjectDto {
    id: number
    name: string
    description: string
    active: boolean
    team: TeamDto
}