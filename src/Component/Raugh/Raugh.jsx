app.get('/storeKeepers/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };

    try {
        // Find the storeKeeper document by ID
        const storeKeeper = await storeKeeperCollection.findOne(filter);

        if (!storeKeeper) {
            return res.status(404).send({ message: 'StoreKeeper not found' });
        }

        // Extract the item IDs from LocalStorageItem array
        const itemIds = storeKeeper.LocalStorageItem.map(item => new ObjectId(item._id));

        // Find the corresponding items in itemsCollection
        const items = await itemsCollection.find({ _id: { $in: itemIds } }).toArray();

        // Merge the item details with the storeKeeper data
        const detailedItems = storeKeeper.LocalStorageItem.map(localItem => {
            const fullItemDetails = items.find(item => item._id.toString() === localItem._id);
            return {
                ...localItem,
                fullItemDetails
            };
        });

        // Attach the detailed items to the storeKeeper object
        storeKeeper.LocalStorageItem = detailedItems;

        res.send(storeKeeper);
    } catch (error) {
        console.error('Error fetching store keeper:', error);
        res.status(500).send({ message: 'Failed to fetch store keeper data', error });
    }
});
Explanation:
Find the storeKeeper document: First, you find the document in the storeKeeperCollection using the ID from the route parameter.

Extract item IDs: You then extract the _id fields from the LocalStorageItem array.

Query itemsCollection: With these IDs, you query the itemsCollection to retrieve the full details of each item.

Merge data: The code merges the item details with the corresponding LocalStorageItem details.

Frontend Code Adjustments
Since your backend now sends the full item details in the LocalStorageItem array, you can access those details directly in the frontend.

javascript
Copy code
const { data: detailData, isLoading, error } = useQuery({
    queryKey: ['detailData', id],
    queryFn: async () => {
        const res = await axios.get(`http://localhost:5012/storeKeepers/${id}`);
        return res.data;
    },
    enabled: !!id,
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
});

useEffect(() => {
    if (detailData && Array.isArray(detailData.LocalStorageItem)) {
        const initialDemandState = detailData.LocalStorageItem.reduce((acc, item) => {
            if (item?._id) {
                acc[item._id] = parseInt(item.demand, 10) || 0;
            }
            return acc;
        }, {});
        setDemandState(initialDemandState);
    }
}, [detailData]);

// When rendering items, now you can access additional details:
{detailData?.LocalStorageItem.map((item, index) => (
    <tr key={item._id} className="lg:text-xl text-white text-center">
        <th>{index + 1}</th>
        <td>{item.fullItemDetails.itemName}</td>
        <td>{item.fullItemDetails.quantity}</td>
        <td className="flex text-center justify-center">
            <button onClick={() => handleDecrease(item._id)} className="text-xl bg-[#7C4DFF] px-3 w-10">-</button>
            <input className="bg-white min-w-10 max-w-14 text-center text-black" value={demandState[item._id] || 0} readOnly />
            <button onClick={() => handleIncrease(item._id)} className="bg-[#7C4DFF] px-3 w-10">+</button>
        </td>
        <td><p className="text-white text-center">{item.purpose}</p></td>
    </tr>
))}






const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5012;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mnncxar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const itemsCollection = client.db("MymensinghBetar").collection('Items');
    const storeKeeperCollection = client.db("MymensinghBetar").collection('StoreKeeper');

    // Endpoint to update the quantity in LocalStorageItem with the quantity from Items collection
    app.patch('/updateLocalStorageQuantities/:storeKeeperId', async (req, res) => {
      try {
        const { storeKeeperId } = req.params;

        // Find the specific StoreKeeper document
        const storeKeeper = await storeKeeperCollection.findOne({ _id: new ObjectId(storeKeeperId) });

        if (!storeKeeper || !storeKeeper.LocalStorageItem) {
          return res.status(404).send({ error: 'StoreKeeper or LocalStorageItem not found' });
        }

        // Loop through each LocalStorageItem and update its quantity
        const updatedItems = await Promise.all(
          storeKeeper.LocalStorageItem.map(async (item) => {
            const itemFromDb = await itemsCollection.findOne({ _id: new ObjectId(item._id) });
            if (itemFromDb) {
              item.quantity = itemFromDb.quantity; // Replace quantity with the one from Items collection
            }
            return item;
          })
        );

        // Update the StoreKeeper document with the modified LocalStorageItem array
        const updateResult = await storeKeeperCollection.updateOne(
          { _id: new ObjectId(storeKeeperId) },
          { $set: { LocalStorageItem: updatedItems } }
        );

        res.send({ message: 'Quantities updated successfully', updateResult });
      } catch (err) {
        console.error('Error updating quantities:', err);
        res.status(500).send({ error: 'Failed to update quantities' });
      }
    });

    // Ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } finally {
    // Keep the client connected for now
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Store management is running');
});

app.listen(port, () => {
  console.log(`Store management is running on port ${port}`);
});
