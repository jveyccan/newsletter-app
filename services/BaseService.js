/**
 * @typedef {import('mongoose').Document} Document
 * @typedef {import('mongoose').Model} Model
 * @typedef {import('mongoose').Types.ObjectId} ObjectId
 */

 class BaseService {
    /**
     * Base class that services on top of mongoose models can inherit from
     * @param {Model} model Instance of mongoose model
     */
    constructor(model) {
      this.model = model;
    }
  
    /**
     * Creates a find query: gets a list of documents that match filter 
     * @param {Object} filter Mongoose filter object. Check https://mongoosejs.com/docs/queries.html
     * @param {string|Object[]} [populateFields] Array of fields to populate. Can be strings or objects. Check https://mongoosejs.com/docs/populate.html#population
     * @param {string|Array|Object} [select] Fields to select in query results. Check https://mongoosejs.com/docs/api.html#query_Query-select
     * @returns {Promise<Document[]>} Array of mongoose docs
     */
    find(filter, populateFields, select) {
      const query = this.model.find(filter);
  
      if (populateFields) {
        populateFields.forEach(field => query.populate(field));
      }
  
      if (select) {
        query.select(select);
      }
  
      return query.exec();
    }
  
    /**
     * Finds one document
     * @param {Object} filter Mongoose filter object. Check https://mongoosejs.com/docs/queries.html
     * @param {string|Object[]} [populateFields] Array of fields to populate. Can be strings or objects. Check https://mongoosejs.com/docs/populate.html#population
     * @param {string|Array|Object} [select] Fields to select in query results. Check https://mongoosejs.com/docs/api.html#query_Query-select
     * @returns {Promise<Document>|Promise<null>} Document if there's a match, otherwise null.
     */
    findOne(filter, populateFields, select) {
      const query = this.model.findOne(filter);
  
      if (populateFields) {
        populateFields.forEach(field => query.populate(field));
      }
  
      if (select) {
        query.select(select);
      }
  
      return query.exec();
    }
  
    /**
     * Finds one document by it's _id
     * @param {string|ObjectId} _id Mongoose document id
     * @param {string|Object[]} [populateFields] Array of fields to populate. Can be strings or objects. Check https://mongoosejs.com/docs/populate.html#population
     * @param {string|Array|Object} [select] Fields to select in query in query results. Check https://mongoosejs.com/docs/api.html#query_Query-select
     * @returns {Promise<Document>|Promise<null>} Document if there's a match, otherwise null.
     */
    findById(_id, populateFields, select) {
      return this.findOne({ _id }, populateFields, select);
    }
  
    /**
     * Creates a new document or documents
     * @param {Object[]|Object} doc Object or array representing the document(s)
     * @returns {Promise<Document>|Promise<Document[]>} Single document or array of documents depending on the input
     */
    create(doc) {
      return this.model.create(doc);
    }
  }
  
  module.exports = BaseService;