import Model, { attr, belongsTo } from '@ember-data/model';

export default class ProductFamilyImageModel extends Model {
  @belongsTo('use') use;
  @belongsTo('image') image;

  @attr('number') rankAmongImages;
}
