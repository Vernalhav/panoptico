import { PublishableValue, SubscribableValue } from "./common";
import { Party } from "../entities";

export class AvailablePartiesModel {
  _availableParties: PublishableValue<Party[]> = new PublishableValue<Party[]>(
    [],
  );
  
  public get availableParties(): SubscribableValue<Party[]> {
    return this._availableParties;
  }
}