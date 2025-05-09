
import { MongoClient, ServerApiVersion, Collection, Db } from 'mongodb';

// Connection string should be stored in environment variables in production
const uri = "mongodb+srv://thiagocleonel:xYfRNhzKILEqB7Zn@test-n8n.u3tbtnr.mongodb.net/";
const dbName = "test-n8n";

// Global variables to store client and db connection
let client: MongoClient | null = null;
let database: Db | null = null;

// Initialize MongoDB connection
export async function connectToMongoDB(): Promise<{ client: MongoClient, db: Db }> {
  if (client && database) {
    console.log("Using existing connection to MongoDB");
    return { client, db: database };
  }
  
  try {
    console.log("Establishing new connection to MongoDB...");
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    
    // Connect the client
    await client.connect();
    
    // Send a ping to verify connection
    database = client.db(dbName);
    await database.command({ ping: 1 });
    
    console.log("Connected successfully to MongoDB");
    return { client, db: database };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

// Close MongoDB connection
export async function closeMongoDB(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    database = null;
    console.log("MongoDB connection closed");
  }
}

// Get leads collection
export async function getLeadsCollection(): Promise<Collection> {
  const { db } = await connectToMongoDB();
  return db.collection('leads');
}

// Function to fetch leads data
export async function fetchLeads(limit = 20, skip = 0): Promise<any[]> {
  try {
    const collection = await getLeadsCollection();
    return await collection.find({}).limit(limit).skip(skip).toArray();
  } catch (error) {
    console.error("Error fetching leads from MongoDB:", error);
    return [];
  }
}

// Function to fetch lead by ID
export async function fetchLeadById(id: number): Promise<any | null> {
  try {
    const collection = await getLeadsCollection();
    return await collection.findOne({ id });
  } catch (error) {
    console.error(`Error fetching lead with ID ${id}:`, error);
    return null;
  }
}

// Function to fetch leads count for each pipeline stage
export async function fetchLeadsByStage(): Promise<any[]> {
  try {
    const collection = await getLeadsCollection();
    const pipeline = [
      {
        $group: {
          _id: { status_id: "$status_id", pipeline_id: "$pipeline_id" },
          count: { $sum: 1 }
        }
      }
    ];
    
    return await collection.aggregate(pipeline).toArray();
  } catch (error) {
    console.error("Error fetching leads by stage:", error);
    return [];
  }
}
