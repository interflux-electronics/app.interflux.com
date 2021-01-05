import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class ProductModel extends Model {
  @alias('id') slug;
  @attr('string') name;
  @attr('string') label;
  @attr('string') pitch;

  @attr('boolean') public;
  @attr('boolean') orderable;
  @attr('boolean') featured;
  @attr('boolean') popular;
  @attr('boolean') new;

  @belongsTo('product-family') productFamily;
  @alias('productFamily') family;

  @belongsTo('image', { inverse: 'product' }) image;

  @hasMany('image', { inverse: 'products' }) images;
  @hasMany('document') documents;
  @hasMany('product-image') productImages;
  @hasMany('product-document') productDocuments;
  @hasMany('product-quality') productQualities;
  @hasMany('product-use') productUses;

  get uses() {
    return this.productUses.sortBy('rank').mapBy('use');
  }

  get qualities() {
    return this.productQualities.sortBy('rank').mapBy('quality');
  }
}
