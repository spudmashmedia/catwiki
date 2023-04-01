//
// Statistics API Proxy
//
// This class will handle all the statistics. For this example we're using node-cache
//
// JD [ - ]
//
class StatisticsApi {
    CACHE_KEY_REPORT_TOP_TEN_SEARCH = "CACHE_KEY_REPORT_TOP_TEN_SEARCH"
    REPORT_TOP_TEN_SEARCHES = "REPORT_TOP_TEN_SEARCHES";

    constructor(cache, logger) {
        this.APP_CACHE = cache;
        this.logger = logger;
    }

    sortCountDescendingOrder = (a, b) => b.count - a.count;

    async getReport(report_id) {
        if (!report_id || report_id == '') { return {} }

        let report = [];

        switch (report_id) {
            case this.REPORT_TOP_TEN_SEARCHES:
                if (this.APP_CACHE && this.APP_CACHE.has(this.CACHE_KEY_REPORT_TOP_TEN_SEARCH)) {
                    report = this.APP_CACHE.get(this.CACHE_KEY_REPORT_TOP_TEN_SEARCH);
                    if (report.length > 10) {
                        report.sort(this.sortCountDescendingOrder);
                        report = report.slice(0, 10); // top 10 clicked on searches
                    }
                }
                break;
            default:
                break;
        }

        return report;
    }

    async setReport(report_id, data) {
        this.logger.info("inside setReport")
        if (!report_id || report_id == '') { return {} }

        switch (report_id) {
            case this.REPORT_TOP_TEN_SEARCHES:
                this.logger.info("inside setReport - matched, about to head to updateTop10Search")
                return await this.updateTop10Search(data);
            default:
                return false;
        }
    }

    // Simple fire and forgot data logger
    async updateTop10Search(data) {
        this.logger.info("inside updateTop10Search")
        if (!data) { return false }
        if (!this.APP_CACHE) { return false }

        //
        // interface Ranking {
        //     id: string;
        //     name: String;
        //     count: number;
        // }
        //

        const createRecord = (newItem) => ({
            id: newItem.id,
            name: newItem.name,
            count: 1
        })

        if (!this.APP_CACHE.has(this.CACHE_KEY_REPORT_TOP_TEN_SEARCH)) {
            // New Cache Record
            let newCacheRecord = [];
            newCacheRecord.push(createRecord(data))
            this.APP_CACHE.set(this.CACHE_KEY_REPORT_TOP_TEN_SEARCH, newCacheRecord);
     
            return true
        }

        // we wil use wipCacheState to mutate values if
        // they match or if push data in if missing
        let wipCacheState = this.APP_CACHE.get(this.CACHE_KEY_REPORT_TOP_TEN_SEARCH);


        // existing record in cache
        let foundItem = wipCacheState.find(currentStateItem => currentStateItem.id === data.id);
        if (foundItem && foundItem?.count) {
            foundItem.count = foundItem?.count + 1;
        }
        else {
            // New Record in cache
            wipCacheState.push(createRecord(data));
        }

        this.APP_CACHE.set(this.CACHE_KEY_REPORT_TOP_TEN_SEARCH, wipCacheState);
        return true;
    }
}

module.exports = (APP_CACHE, logger) => { return new StatisticsApi(APP_CACHE, logger) }