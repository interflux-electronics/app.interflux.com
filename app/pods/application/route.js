import BaseRoute from 'interflux/pods/base/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends BaseRoute {
  @service translation;
  @service store;

  model() {
    this.translation.languages.forEach((language) => {
      this.store.createRecord('language', language);
    });
  }
}
