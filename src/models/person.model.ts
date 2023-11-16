import { AddPersonDto } from '../dto';

export interface Person extends AddPersonDto {
  timestamp: number;
}
