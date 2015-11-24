import { SearchApi } from './SearchApi'
import expect from 'expect.js'

/** Simple smoke test of non-web-worker based SearchApi */
describe('SearchApi', () => {
  const documentA = {id: 1, name: 'One', description: 'The first document'}
  const documentB = {id: 2, name: 'Two', description: 'The second document'}
  const documentC = {id: 3, name: 'Three', description: 'The third document'}

  let searchApi

  beforeEach(() => {
    searchApi = new SearchApi() // Single-threaded Search API for easier testing

    searchApi.indexResource(
      'documents',
      ['name', 'description'],
      [ documentA, documentB, documentC ]
    )
  })

  it('should return documents ids for any searchable field matching a query', done => {
    searchApi.performSearch('documents', 'One').then(ids => {
      expect(ids.length).to.equal(1)
      expect(ids).to.contain(1)
      done()
    })
  })
})