import { UUID } from "crypto";

export default interface FindBasic {
  findId: UUID;
  title: string;
  imageUrl: string;
  dateCreated: Date;
}
