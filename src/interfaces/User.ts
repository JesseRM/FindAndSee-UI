import { UUID } from "crypto";

export default interface User {
  objectId: UUID;
  displayName: string;
}
