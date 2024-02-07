const shortid=require("shortid"); 
const URL = require('../models/url'); 
const { response } = require("express");
async function handleGenerateNewShortURL(req,res){
    const body = req.body; 

    if(!body.url) return res.status(400).json({error:'url is requried'})
    // const shortId=shortid; 
    const shortId = shortid.generate();
    try {
        await URL.create({
            shortId: shortId,
            redirectURL: body.url,
            visitHistory: [],
        });
        res.json({ id: shortId });
    } catch (error) {
        // Handle database insertion error
        console.error("Error creating URL document:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
async function hanleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    try {
        const result = await URL.findOne({ shortId });
        if (!result) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
// async function hanleGetAnalytics(req,res){
//     const shortId = req.params.shortId; 
//     const result = await URL.findOne({ shortId}); 
//     return response.json({totalClicks:result.vistHistory.length, analytics: result.vistHistory,})
// }
//     await URL.create({
//         shortId: shortId,
//         redirectURL:body.url,
//         vistHistory:[],
//     } ); 
//     res.json({id: shortId});
// }

module.exports = {
    handleGenerateNewShortURL,
    hanleGetAnalytics,
}