const bunyan = require('bunyan');
const logger = bunyan.createLogger({ name: 'test', level: 'info' });

describe('Statistics API Tests', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    describe('getReport', () => {

        // integration test
        test('should return exactly 10', async () => {
            const mockData = {
                data: [
                    { id: 1, name: 'a1', count: 1 },
                    { id: 2, name: 'Abyssinian', count: 2 },
                    { id: 3, name: 'b1', count: 3 },
                    { id: 4, name: 'c1', count: 4 },
                    { id: 5, name: 'c1', count: 5 },
                    { id: 6, name: 'c1', count: 6 },
                    { id: 7, name: 'c1', count: 7 },
                    { id: 8, name: 'c1', count: 8 },
                    { id: 9, name: 'c1', count: 9 },
                    { id: 10, name: 'c1', count: 10 },
                    { id: 11, name: 'c1', count: 11 },
                ]
            }

            const nodecache = require('node-cache');
            jest.mock('node-cache', () => jest.fn());
            const has = jest.fn((key) => (true));
            const get = jest.fn((key) => (mockData.data))

            nodecache.mockImplementation(() => ({ has, get }))

            const mockcache = new nodecache();
            const statisticsapi = require('../statisticsapi')(mockcache, logger);

            const res = await statisticsapi.getReport("REPORT_TOP_TEN_SEARCHES")
            expect(res).not.toBeNull();
            expect(res?.length).toBe(10);
        })
    })
    describe('setReport', () => {
        afterEach(() => {
            jest.resetAllMocks();
        });
        test("when cache is empty reported item will create new cache", async () => {
            const nodecache = require('node-cache');
            jest.mock('node-cache', () => jest.fn());
            const has = jest.fn((key) => (false));
            const set = jest.fn((key) => (true))

            nodecache.mockImplementation(() => ({ has, set }))

            const mockcache = new nodecache()

            const testData = {
                id: 1,
                name: 'Buru Nyuu'
            }

            const statisticsapi = require('../statisticsapi')(mockcache, logger);
            let setres = await statisticsapi.setReport("REPORT_TOP_TEN_SEARCHES", testData)
            expect(setres).not.toBeNull();
            expect(setres).toBe(true);
        })
    });
})