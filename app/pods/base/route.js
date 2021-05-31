import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

// This route includes behaviour we need all routes to inherit.

export default class BaseRoute extends Route {
  @service auth;
  @service api;
  @service store;
  @service header;
  @service headData;
  @service window;

  // Alias to avoid confusion with the header service.
  // The seo (headData) service is all about the <head>.
  // The header services is all about the <header>.
  get seo() {
    return this.headData;
  }

  // This initializer makes sure each route transition resets the scroll position
  // of the viewport to the top. Override ad hoc per route to prevent this behaviour.
  //
  resetScroll = true;

  activate() {
    super.activate();
    if (this.resetScroll) {
      this.window.scrollTo(0, 0);
    }
  }

  @action
  error(response) {
    console.error(`error() on "${this.routeName}" route`);

    // Interpret and log the error to console.
    this.api.logError(response);

    // Returning true allows the error to bubble up the route tree which triggers the error
    // templates to show
    return true;
  }
}
