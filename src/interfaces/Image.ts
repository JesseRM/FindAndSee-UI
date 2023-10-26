import { UUID } from "crypto";

export default interface Image {
  imageId: number;
  findId: UUID;
  publicId: string;
  url: string;
}
