import Model, { attr, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class ProductFamilyModel extends Model {
  @alias('id') slug;
  @attr('string') nameSingle;
  @attr('string') namePlural;
  @attr('string') gist;
  @attr('number') order;

  @hasMany('product') products;
  @hasMany('product-family-image') productFamilyImages;

  get images() {
    const rank = 'rankAmongImages';
    const records = this.productFamilyImages;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);
    const sorted = [...ranked, ...rankless];

    return sorted.map(record => record.image);
  }

  get count() {
    return this.products.length;
  }

  get rank() {
    return this.order || 999;
  }

  // Returns plural family name with first letter capitalised
  get label() {
    const str = this.namePlural || '';
    return str[0].toUpperCase() + str.slice(1);
  }
}
