POCKET STOCKS IS AN APP FOR YOUR OPINIONS ON ALL THINGS STOCKS!

To use this app, simply navigate to the 'Holdings' page, enter the required information:

- Ticker Symbol
- Purchase Price
- Recommendation Status
- Stock Value
- Your Post, defending your position, forecasting, or just an opinion

Your post will be added to our database where other users can read your post along with all others.

To view other posts, simply click on the positions listed in the table.

From there, be sure to click 'Get current price' in order to retrieve the most recent market price.

To calculate the ROI based on the purchase price listed in the original post, simply click the 'Get ROI' button.

ENDPOINT DOCUMENTATION:

There are several endpoints used for this API. For each, use the following required parameters: /api/stocks

The utility of these are:

-To retrieve all stock positions: GET = /api/stocks/home
-To post a new stock position: POST = /api/stocks/home
-To retrieve a specific stock position: GET /api/stocks/:id (replace ':id' with the id relative to the desired stock position).
-To delete a stock position: DELETE = /api/stocks/:id (replace ':id' with the id relative to the desired stock position).

