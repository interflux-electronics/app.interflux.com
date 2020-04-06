import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', { path: '/:language' }, function() {
    this.route('products', { resetNamespace: true }, function() {
      this.route('family', { path: '/:family' }, function() {
        this.route('product', { path: '/:product' });
      });
    });
    this.route('articles', { resetNamespace: true }, function() {
      this.route('article', { path: '/:article' });
    });
    this.route('documents', { resetNamespace: true }, function() {
      this.route('category', { path: '/:category' });
    });
    this.route('contact', { resetNamespace: true });
    this.route('catchall', { path: '*:', resetNamespace: true });
  });

  this.route('loading');
  this.route('error');
});

export default Router;
