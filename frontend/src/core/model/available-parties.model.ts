import { PublishableValue } from './common/publishable-value';
import { SubscribableValue } from './common/subscribable-value';
import { Party } from './entities/party.entity';

export class AvailablePartiesModel {
  _availableParties: PublishableValue<Party[]> = new PublishableValue<Party[]>(
    [],
  );
  public get availableParties(): SubscribableValue<Party[]> {
    return this._availableParties;
  }
}
