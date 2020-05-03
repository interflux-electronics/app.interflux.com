import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DocumentCategoryRoute extends Route {
  @service store;
  @service modal;

  model(params) {
    return {
      category: this.store
        .peekAll('documentCategory')
        .findBy('slug', params.category)
    };
  }

  afterModel(model) {
    if (!model.category) {
      console.warn('redirecting back to documents page');
      this.transitionTo('documents');
    }
  }

  renderTemplate() {
    this.render({
      into: 'application',
      outlet: 'modal'
    });
  }

  // Prevent <main> page from scrolling
  activate() {
    console.debug('activate');
    this.modal.setProperties({
      active: true,
      scroll: window.pageYOffset || document.documentElement.scrollTop
    });
    console.log(window.pageYOffset || document.documentElement.scrollTop);
    window.scrollTo(0, 0);
  }

  // Allow <main> page to scroll again
  deactivate() {
    console.debug('deactivate');
    const scroll = this.modal.scroll;
    this.modal.setProperties({
      active: false,
      scroll: 0
    });
    console.log(scroll);
    window.scrollTo(0, scroll);
  }
}
