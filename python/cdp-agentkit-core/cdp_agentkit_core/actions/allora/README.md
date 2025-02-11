## Allora

[Allora Network](https://allora.network/) is an AI-powered inference platform that delivers real-time, self-improving forecasts and insights for various use cases. By aggregating and analyzing data from diverse sources—such as blockchain networks and off-chain APIs—Allora seamlessly provides low-latency, high-performance analytics without requiring complex infrastructure. The platform's intuitive approach allows developers to focus on building intelligence-driven solutions, while Allora takes care of the heavy lifting behind the scenes.

### Actions

#### get_all_topics
Lists all available topics from Allora Network. Each topic represents a specific type of inference or prediction available in the network.

Example response:
```json
{
    "topics": [
        {
            "id": 1,
            "name": "Example Topic",
            "description": "Description of the topic"
        }
    ]
}
```

#### get_inference_by_topic_id
Retrieves inference data for a specific topic using its ID. The topic ID can be obtained from the `get_all_topics` action.

Input parameters:
- `topic_id` (int): The ID of the topic to get inference for (must be greater than 0)

Example response:
```json
{
    "network_inference": "0.5",
    "network_inference_normalized": "0.5",
    "confidence_interval_percentiles": ["0.1", "0.5", "0.9"],
    "confidence_interval_values": ["0.1", "0.5", "0.9"],
    "topic_id": "1",
    "timestamp": 1718198400
}
```

#### get_price_inference
Returns the future price inference for a given crypto asset from Allora Network.

Input parameters:
- `asset` (str): The token to get price inference for (e.g., BTC, ETH, SOL)
- `timeframe` (str): The timeframe for the prediction in format 'Nm' for minutes or 'Nh' for hours (e.g., '5m', '15m', '8h', '24h')

Supported timeframes:
- Minutes: 1m to 60m (e.g., '5m', '15m', '30m')
- Hours: 1h to 24h (e.g., '8h', '24h')

Example response:
```json
{
    "price": "50000.00",
    "timestamp": 1718198400,
    "asset": "BTC",
    "timeframe": "8h"
}
```

