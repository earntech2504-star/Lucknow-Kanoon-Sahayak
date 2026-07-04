// api/news.js - Legal news feed
export default async function handler(req, res) {
    const news = [
        { title: "Supreme Court: BNS 318 requires intent to deceive", source: "LiveLaw" },
        { title: "BNSS 480: Magistrate can grant bail for 7-year offences", source: "SCC Online" },
        { title: "Lucknow HC: New guidelines for BNSS 482", source: "Bar & Bench" },
        { title: "BSA 63: Certificate mandatory for electronic evidence", source: "SC Observer" }
    ];
    res.status(200).json(news);
}